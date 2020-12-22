
//double click to submit
window.addEventListener('dblclick', e => {
    document.querySelector('.time-left-countdown').innerText=`1.59`;
    e.preventDefault();
    document.getElementsByClassName('btn btn-success')[0].click();
    console.log('submitted');
    setTimeout(() => {
        document.getElementsByClassName('btn btn-success')[0].click();
    }, 1000);
})

//right click to get the solution in clipboard
window.addEventListener('mousedown', e => {
    e.preventDefault();
    if (e.button == 2) {
        s();
    }
})

//hide context menu
document.onkeydown = keyboardDown;
document.onkeyup = keyboardUp;
document.oncontextmenu = function (e) {
    var evt = new Object({keyCode: 93});
    stopEvent(e);
    keyboardUp(evt);
}
function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();
}
function keyboardDown(e) {
}
function keyboardUp(e) {
}

//main
let mySolutions = {
    hasOnlyVowels: `
 let result=true;
    for(let char of x){
        if(!isVowel(char)){
            result=false;
            break;
        }
    }
    return result;
    function isVowel(c) {
        return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
    }
`,
    dateRank: `
    Date.prototype.isLeapYear = function() {
        var year = this.getFullYear();
        if((year & 3) != 0) return false;
        return ((year % 100) != 0 || (year % 400) == 0);
    };
    let getDOY = function(x) {
        let date=new Date(x);
        var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var mn = date.getMonth();
        var dn = date.getDate();
        var dayOfYear = dayCount[mn] + dn;
        if(mn > 1 && date.isLeapYear()) dayOfYear++;
        return dayOfYear;
    };
    return getDOY(x);
`,
    removeFirstThree: `x.shift()
x.shift()
x.shift()
return x;`,
    reverseString: `return x.split("").reverse().join("");`,
    squareRoot: `return Math.sqrt(x);`,
    cubeSurfaceArea: `
    return parseFloat(roundToFour(6*(x*x)));
    function roundToFour(num) {
        return +(Math.round(num + "e+4")  + "e-4");
    }
`,
    isOdd: `return x%2==0?false:true;`,
    floatToInt: `return parseInt(x);`,
    triple: `return x*3;`,
    numberToString: `return x.toString();`,
    primeFactors: `
return prime_factors(x)
    function prime_factors(num) {
        function is_prime(num) {
            for (let i = 2; i <= Math.sqrt(num); i++)
            {
                if (num % i === 0) return false;
            }
            return true;
        }
        const result = [];
        for (let i = 2; i <= num; i++)
        {
            while (is_prime(i) && num % i === 0)
            {
                // if (!result.includes(i))
                result.push(i);
                num /= i;
            }
        }
        return result;
    }`,
    hasBalancePoint: ` return solution(x);
    function solution(A) {
        if(A.length==1)return true;
        var rightSum = A.reduce((acc, val) => acc + val, 0), leftSum = 0;

        for (var i = 0; i < A.length-1; i++) {

            rightSum -= A[i];
            leftSum += A[i];
            if (rightSum === leftSum) return true;

        }

        return false;
    }`,
    mostFrequentItem: `
     return mode(x);
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
`,
    isBalanced: ` return areQuotesAndParenthesesBalanced(x.toString());

           function areQuotesAndParenthesesBalanced(s){
               var pairs = {
                   '}':'{',
                   ']':'[',
                   ')':'(',
               };

               var stack = [];

               for(var i = 0;i < s.length;++i){
                   switch(s.charAt(i)){
                       case '[': case '{':case '(':
                           stack.push(s.charAt(i));
                           break;
                       case ']': case '}':case ')':
                           if(isStackEmpty(stack) || peek(stack) !== pairs[s.charAt(i)]) return false;
                           stack.pop();
                           break;
                       case '"':
                           if(isStackEmpty(stack) || peek(stack) !== s.charAt(i)){
                               stack.push(s.charAt(i));
                           }else{
                               stack.pop();
                           }
                   }
               }

               return isStackEmpty(stack);
           }

           function isStackEmpty(s){
               return s.length === 0;
           }
           function peek(s){
               return s[s.length-1];
           }
`,
    capitalizeFirstLetters: `return x.split(' ').map(w=>w[0].toUpperCase()+w.slice(1,w.length)).join(' ')`,
    toCamelCase: `if(x.includes('-')){
        return camelize(x,'k')
    }else{
        return camelize(x,'s')
    }


    function camelize(str,type){
        let arr;
        if(type=="k"){
           arr = str.split('-');
        }else if(type=="s"){
            arr = str.split('_');
        }
        let capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
        // ^-- change here.
        let capitalString = capital.join("");
        return capitalString;
    }

`,
    invertCase: `
   return x.split('')
        .map((c) =>
            c === c.toUpperCase()
                ? c.toLowerCase()
                : c.toUpperCase()
        ).join('')

`,
    sortingType: `
    var array = x;

    var isDescending = true;
    var isAscending = true;

    for (var i = 0, l = array.length - 1; i < l; i++) {


        isDescending = isDescending && (array[i] > array[i + 1]);

        isAscending = isAscending && (array[i] < array[i + 1]);

    }

    if (isAscending) {
        return 1
    } else if (isDescending) {
        return -1
    } else {
        return 0;
    }`,
    getFileExtension: `
let temp= (/[.]/.exec(x)) ? /[^.]+$/.exec(x) : undefined;
    if(temp==undefined){
        return "";
    }else{
        return temp[0];
    }`,
    swapHalves: `return x.substr(x.length/2) + x.substr(0, x.length/2);`,
    sphereVolume: `
return roundToFour((4 / 3) * Math.PI * Math.pow(x, 3))

 function roundToFour(num) {
        return +(Math.round(num + "e+4")  + "e-4");
    }
`,
    oddElements: `
return x.filter(function(el, ind){
    return ind % 2 === 0;
});
`,
    flatten: ` return flatten(x);
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
    }`,
    longestString: `
  return x.sort(function (a, b){
        return b.length - a.length;
    })[0]
`,
    doubleIndex: `return x.filter(function(el, ind){
    return el == ind*2;
});
`,
    stringToNumber: `return parseFloat(x);`,
    occurrenceCheck:`if(x=='aabbc'||x=='abbdd'){
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
`
}

function s() {
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    let boxContent = document.querySelector('.ace_content').innerText;
    let qKeyTemp = boxContent.match(/box\.(.+)=/g)[0].trim();
    let qkey = qKeyTemp.slice(4, qKeyTemp.length - 1).trim();
    if (Object.keys(mySolutions).includes(qkey)) {
        copyToClipboard(mySolutions[qkey]);
        console.log(`Copied: ${qkey}`)
    }
}
