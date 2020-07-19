const loop=function(i,condition,updateFunc,bodyFunc) {

    if (condition(i)){
        bodyFunc(i);
        i=updateFunc(i);
        loop(i,condition,updateFunc,bodyFunc);
    }else{
        return null;
    }

};
// let arr=['salman','soulman','arman'];
// //lets test the loop: print elemenets inside the array using the loop
// loop(0,i=>i<arr.length,i=>i+1,(i)=>{console.log(arr[i])});

//export
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
    module.exports = loop;
if (typeof global != "undefined" && !global.loop)
    global.loop = loop;