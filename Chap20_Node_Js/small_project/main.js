
const {reverse}=require('./reverse');
const {parse}=require('ini');
console.log(
  reverse(  process.argv[process.argv.length-1])
)
console.log(JSON.stringify(parse("x=1\ny=2")));
