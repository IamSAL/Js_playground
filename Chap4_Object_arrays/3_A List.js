//that builds up a list structure  when given array [1, 2, 3] as argument

const arrayToList=(arr)=>{
    let list=null;
    for(let i=arr.length-1;i>=0;i--){
        let tempList={
            value:arr[i],
            rest:list,
        };
        list=tempList;
    }
    
    return list;
   
};

//produces an array from a list
const listToArray=(list)=>{
    let arr=[];
   

    for(let obj=list;obj!=null;obj=obj.rest){
        arr.push(obj.value);
        if(obj.rest==null){
            break;
        }
    }
    
    return arr;
};

//takes an element and a list and creates a new list that adds the element to the front of the input list

const prepend=(val,lis)=>{
    let newList={
        value:val,
        rest:lis,
    };

   list=newList;
};

//which takes a list and a number and returns the element at the given position in the list

const nth=(list,position)=>{
    
    let pos=0;
    for(let obj=list;obj!=null;obj=obj.rest){
        if(pos==position){
            return obj;
        }
        pos+=1;
    }

    return undefined;
};

list=arrayToList([1,2,3,4,5,6,7,8,9]);

//also write a recursive version of nth.

const nthRecursive=(list,value)=>{

   if(list.value.toString()==value.toString()){
      return list
   }if(list.rest==null){
      return undefined
   }
   else{
        return nthRecursive(list.rest,value)
    }
};

console.log(nthRecursive(list,7));
