function compareTriplets(a, b) {
    let score=[0,0];
    a.map((val,index)=>{
        if(val>b[index]){
            score[0]++;
        }else if(b[index]>val){
            score[1]++;
        }
    })

    return score;

}

console.log(compareTriplets([2,5,3],[1,2,4]));
