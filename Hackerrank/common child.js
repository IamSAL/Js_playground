function commonChild(s1, s2) {


    s1=createCombinations(s1.toUpperCase());
    s2=createCombinations(s2.toUpperCase());
    let matched=[];

    let count=0;
    s1.map((char,index)=>{
        if(s2.includes(char)){
            matched.push(char);
        }
    })
    return matched.map(str=>[...new Set(str)].join('')).sort((a,b)=>b.length-a.length)[0].length;


}


function createCombinations(str){
    let comb=str.split('');

    function combs(str){
        if(str.length<1){
            return ;
        }
        for(let j=0;j<str.length;j++){
            let i=0;
            while(i<str.length){
                comb.push(str[j].concat(str.slice(j+1,i+1)));
                i++
            }
        }

        for(let i=0;i<str.length;i++){
            for(let j=2;j<str.length;j++){
                combs(str.slice(i+1));
                combs(str.slice(i,i+1)+str.slice(j));
            }
        }

    }
    combs(str)

    return [...new Set(comb)];
}


console.log(commonChild("SHINCHAN","NOHARAAA"));
