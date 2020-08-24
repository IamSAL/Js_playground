
//import INI from '../Chap9_RegEx/Parsing INI.js';
const num=require('../Chap9_RegEx/3_Numbers_again');
const mathPro=require("math-pro");
const INI=require('../Chap9_RegEx/Parsing INI')
const INInew=require("ini");
console.log(num.isNumber("32423"));
console.log(num.number.test("dsa3124dsf"))

console.log(mathPro.isPrime(5));

console.log(mathPro.quickSort([4,423,345,34,313,542,14,3,3],"asc"))



//function constructor
let adder=Function("a,b","{return a+b}");
console.log(adder(5,7));

let testIni=`; last modified 1 April 2001 by John Doe
[owner]
name=John Doe
organization=Acme Widgets Inc.

[database]
; use IP address in case network name resolution is not working
server=192.0.2.62     
port=143
file="payroll.dat"`;

console.log(INI.INIparser(testIni));


console.log(INInew.encode(INI.INIparser(testIni)));

