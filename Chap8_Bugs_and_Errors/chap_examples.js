

function canYouSpotTheProblem() {

    console.log(this);
    for (i = 0; i <1 ; i++) {
        console.log(this);
    }
    console.log(this);
}



function Person(name){
    //"use strict";
    this.name=name;
};
let p=Person("salman");
console.log(name);//->salman , which is global binding and unexpected. use strict stops from this bogus binding.

//testing
function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`)
    else{
        console.log(`Passed: ${label}`)
    }
}
test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});


//debugging base converter
function numberToString(n,base) {
    let sign="",result="";
    if(n<0){
        sign="-";
        n=-n;
    }

    do {
            result=(n%base).toString()+result;
            debugger
            n=Math.floor(n/base);
        } while (n);

    return sign+result;
}

console.log(numberToString(9398,10));

function promptNumber(question) {
    let result=Number(prompt(question));
    if(Number.isNaN(result)) return null;
    else return result;
}
//promptNumber("input:"); //works in browser

function lastElement(array) {
    if (array.length == 0) {
        return {failed: true};
    } else {
        return {element: array[array.length - 1]};
    }
}

function promptDirection(question) {
    let result=prompt(question);
    if(result.toLowerCase()==="left") return "L";
    if(result.toLowerCase()==="right") return "R";
    throw new InputError("Invalid direction: "+result);
}

function look() {
    if(promptDirection("Which Way, Right or Left?")==="L") {
        return "A house";
    }else{
        return "two angry bears";
    }
}
try{
    console.log("You see ", look())
}catch (e) {
    console.log("Something went wrong, " +e);
}

const accounts={
    a:10,
    b:0,
    c:20
};
function getAccount(){
    let accountName=prompt("Enter an account name:");
    if(!accounts.hasOwnProperty(accountName)){
        throw new Error(`No such account: ${accountName} `);
    }
    return accountName;
}
function transfer(from,amount){
    if(accounts[from]<amount) return;
    let progress=0;
    try{
        accounts[from]-=amount;
        progress=1;
        accounts[getAccount()]+=amount;
        progress=2
    }catch (e) {
        console.log("error in getting account, "+ e)
    } finally {
        if(progress===1){
            accounts[from]+=amount;
        }
    }

}
try{
    transfer("c",5);
}catch (e) {
    console.log("error in transfer, "+ e)
}

console.log(accounts);

function testt(){

    throw new Error("test error")
}
try{
    testt();
}catch (e) {
    console.log(e)
}finally {

}


class InputError extends Error{}

for (;;) {
    try {
        let dir = promptDirection("Where?"); // . typo!
        console.log("You chose ", dir);
        break;
    } catch (e) {
        if (e instanceof InputError){
            console.log("Not a valid direction. Try again.");
        }else{
            throw e;
        }
    }
}


console.log("continued to bottom");