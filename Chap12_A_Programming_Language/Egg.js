

function parseExpression(program){
    program=skipSpace(program);
    let match,expr;
    if(match=/^"([^"]*)"/.exec(program)){
        expr={type:"value",value:match[1]};
    }else if(match=/^\d+\b/.exec(program)){
        expr={type:"value",value:Number(match[0])};
    }else if(match=/^[^\s(),#"]+/.exec(program)){
        expr={type:"word",name:match[0]};
    }else{
        throw new SyntaxError("Unexpected Syntax:"+program);
    }
    return parseApply(expr,program.slice(match[0].length));
}

function parseApply(expr,program){
   program=skipSpace(program);
   if(program[0]!="("){
       return {expr:expr,rest:program};
   }
   program=skipSpace(program.slice(1));
   expr={type:"apply",operator:expr,args:[]};
   while(program[0]!=")"){
       let arg=parseExpression(program);
       expr.args.push(arg.expr);
       program=skipSpace(arg.rest);
       if(program[0]==","){
           program=skipSpace(program.slice(1));
       }else if(program[0] !=")"){
           throw new SyntaxError("Expected ',' or  ')'");
       }
   }
   return parseApply(expr,program.slice(1));
}
let {skipComments}=require('./3_Comments');
function skipSpace(str){
    //skip comments
    str=skipComments(str);

    //skip spaces
    let first=str.search(/\S/);
    if(first==-1){
        return "";
    }
    return str.slice(first);
}

function parse(program){
    let {expr,rest}=parseExpression(program);
    if(skipSpace(rest).length>0){
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}



const specialForms=Object.create(null);

function evaluate(expr,scope){
    if(expr.type=="value"){
        return expr.value;
    }else if(expr.type=="word"){
        if(expr.name in scope){
            return scope[expr.name];
        }else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`)
        }
    }else if(expr.type=="apply"){
        let {operator,args}=expr;
        if(operator.type=="word" && operator.name in specialForms){
            return specialForms[operator.name](expr.args,scope);
        }else{
            let op=evaluate(operator,scope);
            if(typeof op=="function"){
                return op(...args.map(arg=>evaluate(arg,scope)));
            }else{
                throw new TypeError("Applying a non-function.");
            }
        }
    }
};

specialForms.if=(args,scope)=>{
    if(args.length !=3){
        throw  new SyntaxError("Wrong number of arguments to if");
    }else if(evaluate(args[0],scope)!==false){
        return evaluate(args[1],scope);
    }else{
        return evaluate(args[2],scope);
    }
    //similar to ternary op, true?this:that;
};

specialForms.while=(args,scope)=>{
    if(args.length!=2){
        throw new SyntaxError("Wrong number of arguments to while");
    }
    while (evaluate(args[0],scope)){
        evaluate(args[1],scope);
    }
    return false;
}

specialForms.do=(args,scope)=>{
    let value=false;
    for(let arg of args){
        value=evaluate(arg,scope)
    }
    return value;
}

specialForms.define=(args,scope)=>{
    if(args.length!=2){
        throw new SyntaxError("Wrong number of arguments given to define")
    }
    let value=evaluate(args[1],scope);
    scope[args[0].name]=value;
    return value;
}
specialForms.fun=(args,scope)=>{
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }
    let funBody=args[args.length-1];
    let params=args.slice(0, args.length - 1).map(expr => {
        if (expr.type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });
    return function (){
        if(arguments.length!=params.length){
            throw new TypeError("Wrong number of arguments");
        }
        let localScope=Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(funBody, localScope);
    }
}


const topScope=Object.create(null);
topScope.false=false;
topScope.true=true;

for(let op of ["+", "-", "*", "/", "==", "<", ">"]){
    topScope[op]=Function("a,b",`return a ${op} b`);
}

topScope.print=(value)=>{
    console.log(value);
    return value;
}

function run(program){
    return evaluate(parse(program),Object.create(topScope));
}

// run(`
// do(define(total, 0),
// define(count, 1),
// while(<(count, 11),
// do(define(total, +(total, count)),
// define(count, +(count, 1)))),
// print(total))
//
// `)


//
// run(`
// do(define(plusOne, fun(a, +(a, 1))),
// print(plusOne(10)))
// `);
//
// run(`
// do(define(pow, fun(base, exp,
// if(==(exp, 0),
// 1,
// *(base, pow(base, -(exp, 1)))))),
// print(pow(2, 10)))
// `);

//closure:
// run(`
// do(define(f, fun(a, fun(b, +(a, b)))),
// print(f(4)(5)))
// `);
module.exports={topScope,run,parse,skipSpace,specialForms,evaluate};





