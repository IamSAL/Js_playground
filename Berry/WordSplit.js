function wordSplit(strArr){
    let firstElement=strArr[0].toLowerCase();
    let dict=strArr[1].split(',').map(word=>word.toLowerCase());
    for (let twoWords of allWords(firstElement)){
        // console.log(twoWords)
        if(dict.includes(twoWords[0]) && dict.includes(twoWords[1])){
            return twoWords.join(',');
        }
    }
    return `not possible`
}


function allWords(str){
    let words=[];
    let start=0;
    let letters=str.split('');
    for(let i=0;i<letters.length;i++){
        words.push([WordFromArray(start,i,letters),WordFromArray(i,letters.length,letters)]);
    }
    return words;
}
function WordFromArray(start,end,arr){
    let Word=[];
    for(let i=start;i<end;i++){
        Word.push(arr[i]);
    }
    return Word.join('');
}


console.log(wordSplit(["sheikhsalman","S,h,sheikh,salman,she,salmon"]));
//->sheikh,salman