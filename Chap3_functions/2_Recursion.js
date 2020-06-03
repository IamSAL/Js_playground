function EvenOrOdd(num){
    if(num<0){
        return EvenOrOdd(Math.abs(num));
    }
    else if(num==0){
       return 'even';
    }else if(num==1){
       return 'odd';
    }else{
        return EvenOrOdd(num-2);
    }
}

console.log(EvenOrOdd(69));

// function divisors(num){
//     let all_divisors=[]
//     for(let i=1;i<=num;i++){
//         if(num%i==0){
//             all_divisors.push(i);
//         }
//     }
//     return all_divisors;
// }

// console.log(divisors(50));