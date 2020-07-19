let mixedArr=[1,2,3,4,5,6,7,8];
let oddArr=[7,1,2,9];
const loop=require('./2_Your_Own_Loop');
function every(arr,test) {

    //using loop
   // loop(0,i=>i<arr.length,i=>i+1,(i)=>{
   //     if (!test(arr[i])){
   //         res=false;
   //     }
   // });

    //using some method

  return !arr.some(i=>!test(i));
}

//all odd
console.log(every(oddArr,i=>i%2!==0));