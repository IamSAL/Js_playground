process.stdin.resume();
process.stdin.setEncoding('utf-8');

let standardInputString = '';
let currentLine = 0;

function readLine() {
    return standardInputString[currentLine++]
}

process.stdin.on('data', rawData => {
    standardInputString += rawData
});

process.stdin.on('end', _ => {
    standardInputString = standardInputString.trim().split('\n').map(line => {
        return line.trim()
    });

    main()
});
const mode = a =>
    Object.values(
        a.reduce((count, e) => {
            if (!(e in count)) {
                count[e] = [0, e];
            }

            count[e][0]++;
            return count;
        }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
;
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function main(){
let [l,r]=readLine().split(' ');

//     if l==r
//         print l
// else
//     print int(2)

var divs=[];
    for (num of range(parseInt(l), parseInt(r))) {
        let tempDivs=[];
        for(let i=2;i<=num;i++){
            if(num%i==0){
                tempDivs.push(i);
            }
        }
        divs=divs.concat(tempDivs)
    }
console.log(mode(divs))
}