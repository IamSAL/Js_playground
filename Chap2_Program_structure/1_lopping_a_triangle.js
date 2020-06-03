/*for(let i=1;i<=7;i++){
    for(let j=1;j<=i;j++){
        //runs on node only
        process.stdout.write('* ')
       
    }
    console.log('\n')
}*/


//runs on console log without new line:

var res=[''];
for(let i=1;i<=7;i++){
    for(let j=1;j<=i;j++){
        res.push('#')
    }
    res.push('\n')
}
console.log(...res);
