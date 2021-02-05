let {readFile,writeFile,unlink, rename, stat}=require("fs")
let {readdir}=require("fs").promises;

readFile('main.js',(err,data)=>{
    if(err){
       throw err
    }
    
    let res=`file size:${data.length} bytes\nContent:${data}\nBytes:${[...data].toString()}`;
    writeFile("fileinfo_mainjs.txt",res,(err)=>{
        if(err){
            console.log(`Failed to write:`,err);
        }else{
            console.log(('file written'));
        }
    });
    // console.log("The file contains:",data.length,"bytes of data","\nfirst byte:",data[0]);
})

readdir('../').then((files)=>{
    console.log(files)
})

stat('./fileSys.js',(err,info)=>{
    console.log(err?err:`Info:${JSON.stringify(info)}`)
})

// rename('../index.js','../node.js',(err)=>{
//     if(err){
//         console.log(err)
//     }
    
// })

// unlink('../package.json',(err)=>{
//     if(err){
//         console.log(err.message)
//     }
// })