const reverseArray=(arr)=>{
    let reversedArray=[];
    for(let i=arr.length-1;i>=0;i--){
        reversedArray.push(arr[i]);
    }
    return reversedArray;
};

const reverseArrayInPlace=(arr)=>{
    let tempArr=[...arr];
    for (let i=arr.length-1;i>=0;i--){
        arr[Math.abs((arr.length-1)-i)]=tempArr[i]
    }
};


let testArr=[1,2,3,4,5,6,7,8,9,10];
reverseArrayInPlace(testArr);
console.log(testArr);

