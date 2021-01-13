function simpleArraySum(arr) {
    /*
     *
     * Write your code here.
     */
    let sum1=0
    let sum2=0
    for(let i=0,j=0,k=arr.length-1; i<arr.length,j<arr,k.length,k>=0; j++, i++,k--) {
                sum1+=arr[i][j]
                sum2+=arr[i][k]
    }

    return Math.abs(sum1-sum2);

}
console.log(simpleArraySum( [[ 11, 2, 4 ], [ 4, 5, 6 ], [ 10, 8, -12 ] ]));

