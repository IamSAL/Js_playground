let skipComments=str=>str.replace(/#.*/g,"");


let skipInnerSpaces=str=>str.split(`\n`).map(line=>line.trim())
                            .filter(line=>line.length>0)
                            .map(line=>spaceReplacer(line)).join('\n');

function spaceReplacer(line){
    console.log(line,line.length)
    //ignore if its contains string values
    if(/".+"/g.test(line)){
        let mathStart=line.match(/".+"/).index;
        let mathEnd=line.match(/".+"/).index+line.match(/".+"/g)[0].length;
        return spaceReplacer(line.slice(0,mathStart))
            +line.slice(mathStart,mathEnd)
            +spaceReplacer(line.slice(mathEnd,line.length-1));
    }else{
        return line.replace(/(\s{2,})/g,"");
    }
}
//test
// console.log(skipInnerSpaces(skipComments(`do(
//                 define(arr,array(1,+(   2,7),  3    ,  4,         5,  "salman","  Apple         is   awesome",7,  9,     3423   ,  2)  ),
//                 print    (arr),
//                 #comments
//
//                 print    (length   (   arr)),#inline comment
//
//                 print(element(arr,   5)),
//                 #comment
//                 )`)))

module.exports={skipComments};