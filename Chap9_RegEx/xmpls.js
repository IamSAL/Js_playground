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
console.log(/(\d)+/.exec("123fsdf435"))

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


console.log("salman")
console.log("this i5 a 5741ng w17h nu3be4s".replace(/\d+/g,"NUMBER"))
console.log(/\d+/.exec("this i5 a 5741ng w17h nu3be4s"))
let match=/\d+/.exec("this i5 a 5741ng w17h nu3be4s");
let testr="this i 5 a 574 1 ng w 17 h nu 3 be4s";
let number=/\d+/g;
let match2;
console.log(match2);
while (match2=number.exec(testr)){
    console.log(match2.index,":",match2[0]);
}
console.log(match2);



let name = "har*ry";
let escaped=name.replace(/[.+*?(){|^$]/g,"\\$&")
console.log(escaped)
let text = "Har*ry is a suspicious character.";
let reg=new RegExp(`\\b(${escaped})\\b`,"gi");
console.log(text.replace(reg, "^$1^"));

/*

shortcuts:

/abc/       A sequence of characters
/[abc]/     Any character from a set of characters
/[^abc]     Any character that is not in the set
/[0-9]/     Any character in a range of characters
/x+/        One or more occurrences of x
/x* /       Zero or more occurrences of z
/X?/        Zero or one occurrences, optional occurrence
/x{2,4}/    2 to 4 occurrences of x
/(abc)/     A group
/a|b|c/     Any of the given pattern
/\d/        Any digit character
/\w/        An aplhanumeric character (word character)
/\s/        Any whitespace character
/\S/        Any Non-whitespace character
/./         Any character except newlines
/\b/        A word boundary(must not be any word or number around the pattern)
/\n/        A newline
/^/         Start of the input
/$/         End of input

 */
