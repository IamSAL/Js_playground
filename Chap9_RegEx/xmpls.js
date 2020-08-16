let re1=new RegExp("abc");
let re2=/abc\//;
console.log(typeof re2,re2,re1);
console.log(re1.test("abcde"));
console.log(re1.test(`abxc/`));
//returns true if abc occur anywhere in the testing string.

console.log(re1.test("helloabcmelloabc"));

//character groups
let setchar=new RegExp("[ABCD0123]");
console.log(setchar.test("SA2"));//A2 matches.

//if contains digit
let range=new RegExp("[0-9]"); //["A-Z"]contains any characters from A to Z.
console.log(range.test("F!34"));//cotains digit

/*
some common character groups has builtin shortcuts:
\d: Any digit character.
\w: Any Alphanumerical character.
\s: Any Whitespace character.
\D: A character that is not a digit.
\W: A nonalphanumeric character, a character that is not abcd etc.
\S: A non whitespace character.
.:  Any character except newline

 */

let dateTime=new RegExp("\\d\\d-\\d\\d-\\d\\d\\d\\d \\d\\d:\\d\\d");
let dateTime2=/\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime2.test("01-30-2003 15:20"));

//invert: match anything except the pattern;

let notBinay=/[^01]/;
console.log(notBinay.test("101001"));

let ooh=/o{2}h/;
console.log(ooh.test("oooooh"));

let anyName=/(^(an)((y)|(nie)))/;

console.log(anyName.test("any"))

console.log(/neighbou?r/.test("neighbor"))

let cartoonCrying=/boo+(hoo+)/i;
console.log(cartoonCrying.test("BooohooohoooHOoo"))

console.log(/neighbou?r/.exec("neighbour"))
console.log(/\d+/.exec("one two 100"));
console.log("one three 250000 hello 100 ".match(/(hello)/))
console.log(/bad(ly)?/.exec("bad"));
console.log(/'(\w+)'/.exec("she said 'hello'"))
console.log(/(\d)+/.exec("123"))

let dt=new Date();
console.log(dt)
let myBirthday=new Date(1997,10,7,4,45,30,100);
console.log(myBirthday)
console.log(dt.getTime())
console.log(Date.now())

function getDate(string) {
    let [_, month, day, year,index]=/(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    console.log(index);
    return new Date(year,month-1,day);

}
console.log(getDate("11-7-1997"))


