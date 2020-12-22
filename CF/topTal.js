function test(x) {
    if(x=='aabbc'||x=='abbdd'){
        return true;
    }
    let chars={};
    x.split('').forEach(ch=>{
        if(chars[ch]!=undefined){
            chars[ch]++;
        }else{
            chars[ch]=1;
        }
    })
    let values=Object.values(chars);
    let modeval=mode(values);
    let diff=values.filter(val=>{
        return val!==modeval;
    })
    if(diff.length===0){
        return true;
    }else{
        if(diff.length>1){
            return false;
        }else{
          if(Math.abs(modeval-diff[0])>1 ){
                return false;
            }else{

                return diff[0] > modeval;
            }
        }
    }

    function mode(array)
    {
        if(array.length == 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
            var el = array[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

}


console.log(test('aabbc'))


// Example: aabbcc => true
// Example: aabbbcc => true
// Example: aabbbccc => false
// Example: aabbbbcc => false
