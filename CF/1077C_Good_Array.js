let n=readLine();

let niceIndices=[];
for(let i=0;i<n;i++){
    let testArr=readLine().filter((item,index)=>{
       return index!==i;
    });
    if(isGood(testArr.sort())){
        niceIndices.push(i+1)
    }
}
var count=niceIndices.length;
console.log(count);
if (count>0){
    console.log(...niceIndices)
}

function isGood(sortedArr) {
    let compElm=sortedArr[sortedArr.length - 1];
    sortedArr.pop();
    return compElm === sortedArr.reduce((a, b) => a + b, 0);
}

