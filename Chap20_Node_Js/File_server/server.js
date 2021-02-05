const {createServer}=require('http');
const {parse}=require("url");
const {resolve,sep}=require("path");
const mime=require("mime");
const {createReadStream,createWriteStream,statSync}=require('fs');
const {stat,readdir,rmdir,unlink,mkdir,rename}=require("fs").promises;

const dirTree = require("directory-tree");

const methods=Object.create(null);

createServer((request,response)=>{

   console.log(urlPath(request.url));
    // console.log(request.url,request.method)
    let handler=methods[request.method] || notAllowed;
    handler(request)
    .catch(error=>{
        if(error.status!=null) return error;
        return {body:String(error),status:500};
    })
    .then(
        ({body,status=200,type="text/plain",link=''})=>{
            response.writeHead(status,{"Content-Type":type,"file-link":link});
            if(body && body.pipe) body.pipe(response);
            else response.end(body);
        }
    )
}).listen(8080)

async function notAllowed(request){
    return {status:405,body:`Method ${request.method} not allowed.`}
}

const baseDirectory=process.cwd()
// console.log(baseDirectory)

function urlPath(url){
    let {pathname}=parse(url);
    let path=resolve(decodeURIComponent(pathname).slice(1));
    // console.log({baseDirectory,url,path})
    if(path != baseDirectory && !path.startsWith(baseDirectory+sep)){
        throw {status:403,body:"Forbidden"};
    }
    return path;
}
function getStat(link){
    return statSync(urlPath(link))
}
function isDir(url){
    return getStat(url).isDirectory()?"Directory":"file";
}


methods.GET=async function(request){
    let path=urlPath(request.url);
    let stats;

    try{
        stats=await stat(path);
    }catch(error){
        if(error.code!="ENOENT") throw error;
        else return {status:404,body:"File not found"};
    }
    if(stats.isDirectory()){
        let files={

        }
        let dirs=await readdir(path)

        files.list=dirs.map((file=>{
            return {
                name:file,
                link:parse(request.url+sep+file).href,
                type:isDir(parse(request.url+sep+file).href),
                contentType:mime.getType(file),
                extension:mime.getExtension(mime.getType(file)),
                stats:getStat(parse(request.url+sep+file).href)
            }
        }))
        files.tree=dirTree(path)

        return {body:JSON.stringify(files),type:"text/html"};
    }else{
        return {body:createReadStream(path),type:mime.getType(path),link:request.url};
    }
}

methods.DELETE=async function(request){
    let path=urlPath(request.url);
   
    let stats;

    try{
        stats=await stat(path);
    }catch(error){
        if(error.code!="ENOENT") throw error;
        else return {status:204};
    }
    if(stats.isDirectory()){
        await rmdir(path,{ recursive: true })
    }else{
       await unlink(path)
    }
    return {status:204};
}


function pipeStream(from,to){
    return new Promise((resolve,reject)=>{
        from.on("error",reject);
        to.on("erro",reject);
        to.on("finish",resolve);
        from.pipe(to);
    })
}


methods.PUT=async function(request){
    let path=urlPath(request.url);
    await pipeStream(request,createWriteStream(path));
    return {status:204};
}


methods.MKCOL=async function(request){
    let path=urlPath(request.url);
    await mkdir(path);
    return {status:204}
}

methods.MOVE=async function(request){
    return new Promise((resolve,reject)=>{
        let path=urlPath(request.url);
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        })
        request.on('end', async () => {

            try{
                await rename(path,urlPath(JSON.parse(data).toName))
                resolve({status:204})
            }catch(e){
                reject({status:500})
            }

        })
    })
}