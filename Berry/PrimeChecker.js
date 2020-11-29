const isPrime = num => {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}

function PrimeChecker(num){

    let arrangements=permutator(num.toString().split(''));
    for(let arrangement of arrangements){
        num=arrangement.join('')
        if(isPrime(Number(num))){
            return 1;
        }
    }
    return 0;
}

function permutator(inputArr) {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)
    return result;
}

console.log(PrimeChecker(598));