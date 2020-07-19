let print=console.log;
var a=14;
evenOdd(a);

function evenOdd(weight){
   if(weight%2==0 && evenParts(weight)){
     print('YES')

   }else{
       print('NO')
   }
}

function evenParts(weight){
    if((weight/2)%2==0){
        return true;
    }else{
        for(let i=1;i<=weight-2;i++){
            w2=weight-i;
            w3=weight-w2;
            if(w2%2==0 && w3%2==0){
               return true;
            }
        }
            
    }
 

 return false;
}