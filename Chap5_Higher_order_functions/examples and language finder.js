process.stdin.resume();
process.stdin.setEncoding('utf-8');

let standardInputString = '';
let currentLine = 0;

function readLine() {
    return standardInputString[currentLine++]
}

process.stdin.on('data', rawData => {
    standardInputString += rawData
});

process.stdin.on('end', _ => {
    standardInputString = standardInputString.trim().split('\n').map(line => {
        return line.trim()
    });

    main()
});

function repeat(n,action) {
    for (let i=0;i<n;i++){
        action(i);
    }
}
function greaterThan(num) {

    return function (n,number=num) {
        return n>number;
    }
}

function noisy(f) {
    return (...args)=>{
        console.log("calling with:",args);
        let res=f(...args);
        console.log("called with",args,"returned result",res)};
}

function unless(test,then) {
    if (!test)then();
}
function filter(arr,test) {
    let tempArr=[];
    for(let i=0;i<arr.length;i++){
        if (test(arr[i])){
            tempArr.push(arr[i])
        }
    }
    return tempArr;
}

function map(arr,mapper) {
    let tempArr=[];
    for (let i=0;i<arr.length;i++){
        tempArr.push(mapper(arr[i]));
    }
    return tempArr;
}

function reduce(arr,combine,start) {
    let current=0;
    if(start!==undefined){
        current=start;
        for(let i=0;i<arr.length;i++){
            current=combine(current,arr[i]);
        }
    }else{
        current=arr[0];
        for(let i=0;i<arr.length-1;i++){
            current=combine(current,arr[i+1]);
        }
    }
    return current;
}


function charCount(script) {
    return script.ranges.map((range)=>range[1]-range[0]).reduce((a,b)=>a+b,0);

}

function average(arr) {
    return arr.reduce((a,b)=>a+b,0)/(arr.length);

}


function main() {
    const SCRIPTS=require('./scripts.js');
    const living=filter(SCRIPTS,(script)=>{return script.direction==='rtl'});
    const bigScript=SCRIPTS.reduce((a,b)=>{return charCount(a)>charCount(b) ? a : b;});

    let avg_year=Math.round(average(SCRIPTS.filter((script)=>script.living).map((script)=>script.year)));


    function charScript(code){
        for(let script of SCRIPTS){
            if(script.ranges.some(([from,to])=>{
                return code>=from && code<to;
            })){
                return script;
            }
        }
        return null;
    }

    function countBy(items,groupNameFunc){
        let counts=[];
        for(let item of items){
            let name=groupNameFunc(item);
            let known=counts.findIndex(c=>c.name===name);
            if(known===-1){
                counts.push({name,count:1});
            }else {
                counts[known].count++;
            }
        }

        return counts;
    }


    function textScript(text){
        let scripts=countBy(text,char=>{
            let script=charScript(char.codePointAt(0));
            return script ? script.name : "none";

        }).filter(({name})=>name !== "none");

        let total=scripts.reduce((n,{count})=>n+count,0);
        if (total==0){
            return "No Scripts Found";
        }

        return scripts.map(({name,count})=>{
            return `${Math.round(count * 100 / total)}% ${name}`;
        }).join(", ");

    }

    console.log(textScript('প্রিয় বাংলা ভাষার সরলীকরণ। ثثثثثلاللغ٧٧'));

}