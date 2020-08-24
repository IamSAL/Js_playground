let number=/^([+\-])?(\d+\.?|\.?\d+)(\d+)?(([eE]\+?)|([eE]\-?))?(\d+)?$/;

/*
console.log(number.test("1235"));
console.log(number.test("-3423"));
console.log(number.test("+3423"));
console.log(number.test("5.0"));
console.log(number.test(".50"));
console.log(number.test("10e4"));
console.log(number.test("10e-4"));
console.log(number.test("10.6e-4"));
console.log(number.test("324df3214"));
*/
//test
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
    "1.3e2", "1E-4", "1e+12"]) {
    if (!number.test(str)) {
        console.log(`Failed to match '${str}'`);
    }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
    ".5.", "1f5", "."]) {
    if (number.test(str)) {
        console.log(`Incorrectly accepted '${str}'`);
    }
}


const isNumber=function (val) {
    return number.test(val.toString());
};

module.exports={number,isNumber};
//
// exports.isNumber=function (val) {
//     return number.test(val.toString());
// };
//
// exports.num=number;