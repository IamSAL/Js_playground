
//methods
function speak(line){
    console.log(`The ${this.type} rabbit says ${line}`);
}

let rabbit={};
rabbit.type="White";
rabbit.speak=speak;
rabbit.speak("I am alive");

let blackRabbit={type:"Black",speak};
blackRabbit.speak("I am blacky!");

let hungryRabbit={type:"Hungry"};

speak.call(hungryRabbit,"I am hungry!");

function normalize() {
    console.log(this.coords.map(n=>n/this.length))
}
normalize.call({coords:[0,2,3],length:5});

//////////prototypes

let empty={};
console.log(empty.toString);

console.log(Object.getPrototypeOf(empty)===Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Function.prototype===Object.getPrototypeOf(speak));
console.log(Array.prototype===Object.getPrototypeOf([]));

//specific prototype
let protoRabbit={
    speak(line){
        console.log(`the ${this.type} rabbit says ${line}`);
    }
};
let killerRabbit=Object.create(protoRabbit);
killerRabbit.type="Killer";
killerRabbit.speak("I KILLL!!");

function Mule(type){
    this.type=type;
}
Mule.prototype.speak=function(line){
    console.log(`The ${this.type} mule says ${line}`);
};

let weirdMule=new Mule("Weird");
weirdMule.speak("Meee Wierdoo!");

console.log(Object.getPrototypeOf(weirdMule)===Mule.prototype);//true
console.log(Object.getPrototypeOf(Mule)===Function.prototype);//true


class Cow{
    constructor(type) {
        this.type=type;
    }
    speak=function(line) {
        console.log(`${this.type} says ${line}`);
    }

}
Cow.prototype.teeth="small";


let calf=new Cow("calves");

calf.teeth="small,sharp and shiny";
console.log(calf.teeth);

calf.speak=function(){
    console.log(" I am the overridden calf!")
};
calf.speak();


let redCalf=new Cow("red");
console.log(redCalf.teeth);
redCalf.speak("red like afternoon's light!");

console.log(Array.prototype.toString===Object.prototype.toString);//false, because they are overridden with exceptional behaviour

let ages=new Map();
ages.set("Boris", 29);
ages.set("Julia", 28);
ages.set("Liang", 22);
console.log(`Liang is ${ages.get("Liang")} years old`);
console.log(ages.has("toString"));
console.log(ages.entries());

redCalf.toString=function(){
    return `This is a ${this.type} Cow and has ${this.teeth} teeth`
};
console.log(redCalf.toString());


//Symbols

let sym=Symbol("Salman");
console.log(sym===Symbol("Salman"));
Cow.prototype[sym]=65;

console.log(redCalf[sym]);

const toStringSymbol=Symbol("toString");
Array.prototype[toStringSymbol]=function () {
    return `${this.length} number of elements`
};
console.log([1,2,3,4,5][toStringSymbol]());

let stringOBJ={
    [toStringSymbol](){
        return `A simple Array array`
    }
};
console.log(stringOBJ[toStringSymbol]());

let OkIterator="OK"[Symbol.iterator]();
console.log(OkIterator.next());
console.log(OkIterator.next());
console.log(OkIterator.next());


//iterable custom matrix data structure
/*
    content: [
     '00', '10', '20', '30',
     '01', '11', '21', '31',
     '02', '12', '22', '32',
     '03', '13', '23', '33'
     ]

 */

    class Matrix {
    constructor(width,height,element=(x,y)=>undefined) {
        this.width=width;
        this.height=height;
        this.content=[];

        for (let y=0;y<height;y++){
            for (let x=0;x<width;x++){
                this.content[y*width+x]=element(x,y);
            }
        }
    }
    get(x,y){
        return this.content[y*this.width+x];
    };

    set(x,y,value){
        this.content[y*this.width+x]=value;
    }

    get dimension(){
        return `${this.height} X ${this.width}`;
    }

    [Symbol.iterator](){
        return new MatrixIterator(this);
        }

}


class MatrixIterator{
        constructor(matrix) {
            this.x=0;
            this.y=0;
            this.matrix=matrix;
        }
        next(){
            if(this.y===this.matrix.height) return {done:true};
            let value={ x:this.x,
                        y:this.y,
                        value:this.matrix.get(this.x,this.y)
            };
            this.x++;

            if(this.x===this.matrix.width){
                this.x=0;
                this.y++;
            }

            return {value, done: false}
        }
}


let myMatrix=new Matrix(4,4,(x,y)=>`${x}${y}`);

for (let {x, y, value} of myMatrix) {
    console.log(x, y, value);
}

console.log(myMatrix.dimension);

//getters,setters,static
class Temperature{
    constructor(celsius) {
        this.celsius=celsius;
    }
    get Fahrenheit(){
        return this.celsius*1.8+32;
    }
    set Fahrenheit(fahrenheit){
        this.celsius=(fahrenheit-32)/1.8;
    }
    static fromFahrenheit(value){
        return new Temperature((value-32)/1.8)
    }
}
let temp=new Temperature(22);
console.log(temp.celsius);
console.log(temp.Fahrenheit);
temp.Fahrenheit=86;
console.log(temp.celsius);

let newTemp=Temperature.fromFahrenheit(98);
console.log(newTemp.celsius.toPrecision(4));


//Inheritance

class SymmetryMatrix extends Matrix{
    constructor(size,element=(x,y)=>undefined) {
        super(size,size,(x,y)=>{
            if(x<y) return element(y,x);
            else return element(x,y)
        });
    }
    set(x,y,value){
        super.set(x,y,value);
        if(x!==y){
            super.set(y,x,value);
        }
    }
    static isSymmetry(matrix){
        for (let i=0;i<matrix.width;i++){
            for (let j=0;j<matrix.height;j++){
                if(matrix.get(i,j)!==matrix.get(j,i)){
                    return false;
                }
            }
        }

        return true;
    }
}

let mySymmetryMatrix=new SymmetryMatrix(4,(x,y)=>x+y);
mySymmetryMatrix.set(1,0,"Salman");
console.log(mySymmetryMatrix.content);
console.log(SymmetryMatrix.isSymmetry(myMatrix));
console.log(SymmetryMatrix.isSymmetry(mySymmetryMatrix));

for (let elm of mySymmetryMatrix){
    console.log(elm);

}
console.log(mySymmetryMatrix instanceof SymmetryMatrix);

