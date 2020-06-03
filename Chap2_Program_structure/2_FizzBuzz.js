let i=1;
while(i<=100){
    //print "FizzBuzz" for numbers that are divisible by both 3 and 5
    if(i%3==0 && i%5==0){
        console.log('FizzBuzz');
        
    }//numbers divisible by 3, print "Fizz"
    else if(i%3==0){
        
        console.log('Fizz');
    }  
    //numbers divisible by 5, print "Buzz"}
    else if(i%5==0){
        console.log('Buzz');
    }//else print number
    else{
    console.log(i)
    }
    
    i++;
}