
/*
rules:
1.ignore blank lines
2.ignore lines starting with ;
3.lines wraped in [ ] are section
4.lines that contains lorem=ipsum are properties:value
5.anything else causes error
*/


const INIparser=function(INI){

    let result={};
    let section=result;
    let comments=[];

    INI.split(/\r?\n/).forEach((line,index)=>{
            //console.log(index+1,":",line);
            let match;
            if(match=line.match(/(\w+)=(.*)/)){

                let prop=match[0].split('=')[0];
                let val=match[0].split('=')[1];
                section[prop]=val;

            }else if (match=line.match(/\[(.*)\]/)){
                result[match[1]]={};
                section=result[match[1]];
            }else if (
                line.match(/\;.*/)
            ){
                comments.push(line);
            }
            else if(match=line.match(/^(\r?\n)?(\s+)?$/)){

            }else{
                throw new Error(`Line ${index}:invalid`);

            }


        }
    );

    return result;
}

module.exports={INIparser};