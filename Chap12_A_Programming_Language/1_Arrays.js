const {topScope,run}=require('./Egg');

topScope.array=(...values)=>{
    return Array.from(values);
}
topScope.length=(array)=>{
    return array.length;
}
topScope.element=(array,n)=>{
    return array[n];
}


run(`do(
    define(arr,array(1,+(2,7),3,4,5, "salman","Apple") ),
    print (arr),
    print (length ( arr)),
    print(element(arr, 5)),
    )
`);

module.exports={topScope,run};