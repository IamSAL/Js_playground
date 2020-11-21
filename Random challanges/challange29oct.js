const detailedString=(str)=>{
    let uniqueDigits=new Set(str.match(/\d/g)).size;
    let totalUppercase=str.match(/[A-Z]/g).length;
    let totalLowercase=str.match(/[a-z]/g).length;
    return {
        uniqueDigits,totalUppercase,totalLowercase,"length":str.length
    }
}

console.log(detailedString(`T51s 1s 4 5Tr1ng.`));
//{ uniqueDigits: 3, totalUppercase: 2, totalLowercase: 5, length: 17 }
