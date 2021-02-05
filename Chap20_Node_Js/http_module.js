const { Console } = require('console');
const {createServer}=require('http');

let server=createServer(
    (req,res)=>{
        console.log(req.url,req.method)
        if(req.url=='/uppercase'){
            
        res.writeHead(200,{"Content-Type":"text/plain"});
        req.on("data",chunk=>{
            process.stdout.write(chunk.toString())
            res.write(chunk.toString().toUpperCase());
        })
        req.on("end",()=>{
            res.end();
        })
        
        }else{
            
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(`
        <h1>Hello!</h1>
        <p>You asked for <code>${req.url}</code></p>
        `)
        res.end();
        }
        
    }
)

server.listen(80);
console.log("Listening! (port 80)");

