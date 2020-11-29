function TimeConvert(num){
    let hours=0,
        minutes=0;
    function calculateTime(num){
        if(num==0){
            return 0;
        }
        else if(num>60){
            hours+=1;
            calculateTime(num-60);
        }else if(num<60 & num >0){
            minutes+=num;
        }
    }
    calculateTime(num);
    return `${hours}:${minutes}`;
}

console.log(TimeConvert(126));