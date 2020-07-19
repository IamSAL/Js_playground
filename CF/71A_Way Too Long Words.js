let n=4;
let print=console.log;

let checkWord=(word)=>{
    let count=0;
    if(word.length>10){
        for(let i=1;i<=word.length-2;i++){
            count++;
        }

     return word[0]+count.toString()+word[word.length-1];
    }else{
        return word;
    }
};
let words=['word','localization','internationalization','pneumonoultramicroscopicsilicovolcanoconiosis'];

for(let i=0;i<n;i++){
    print(checkWord(words[i]));
}
