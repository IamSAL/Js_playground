const { Cipher } = require("crypto");
const { writeFile } = require("fs");
const {request}=require("http");
const { hostname } = require("os");

function sendReq(url){
   
    let host=url.split('/')[0];
    let res='/'+url.split('/')[1];
    console.log({host,res})
    let requestStream=request({
        hostname:host.trim(),
        path:res.trim(),
        method:"DELETE",
        headers:{Accept:"text/html"}
    },(response,err)=>{

        let data = ""

      response.on("data", d => {
        process.stdout.write(d.toString());
        data += d
      })
      response.on("end", () => {
        //console.log(data)
        writeFile('res.txt',data,()=>{
            
        })
      })
      
        if(err){
            console.log(err.message);
        }
       
        //console.log("Server Responded with status code",response.statusCode)
        
    })
  
    requestStream.end();
}

//let str=process.argv[process.argv.length-1];
let url=process.argv[process.argv.length-1];
sendReq(url);