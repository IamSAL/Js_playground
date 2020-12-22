var input = require('fs').readFileSync('input.txt', 'utf8');
var lines = input.split('\n');
let [A,B,C]=lines[0].split(' ');
let a=0.5*A*C;
let b=3.14159*Math.pow(C,2);
let c=((parseFloat(A)+parseFloat(B))/2)*C;
let d=Math.pow(B,2);
let e=A*B;
console.log(`TRIANGULO: ${a.toFixed(3)}
CIRCULO: ${b.toFixed(3)}
TRAPEZIO: ${c.toFixed(3)}
QUADRADO: ${d.toFixed(3)}
RETANGULO: ${e.toFixed(3)}`)

