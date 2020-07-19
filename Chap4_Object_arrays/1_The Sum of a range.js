const range=(start,end,step=1)=>{
    let numbers=[];

    //for negative decrement step values
    if (start>end){
        for (let i=start;i>=end;i=i-Math.abs(step)){
            console.log(i);
            numbers.push(i);
        }
    }else{//for normal increment value
        for (let i=start;i<=end;i=i+step){
            console.log(i);
            numbers.push(i);
        }
    }
    return numbers;
};

const sum=(numbers)=> {
    let sum=numbers.reduce((a, b) => a + b, 0);
    return sum;

};

console.log(sum(range(1,10)));

