let n=2;
let print=console.log;

let problems=['1 0 0','0 1 1'];

let solved=0;
for(let i=0;i<n;i++){

   if(checkConfidence(problems[i])>=2){
    solved++;
   }
}
print(solved);

function checkConfidence(opinions){
    let opinion=opinions.split(" ").map((item)=>parseInt(item));
    return opinion.reduce((a,b)=>a+b,0);
    
}
