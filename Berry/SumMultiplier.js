function SumMultiplier(arr){
    let sumDouble=arr.reduce((a,b)=>{
        return a+b;
    })*2;
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr.indexOf(arr[i])===arr.indexOf(arr[j])){
                continue;
            }
            // console.log(`${arr[i]} * ${arr[j]} = ${arr[i]*arr[j]}`);
            if(arr[i]*arr[j]>sumDouble){
                return true;
            }
        }
    }
    return false;
}

console.log(SumMultiplier([2,5,6,-6,16,2,3,6,5,3]));
//->true, 6 * 16 = 96>84