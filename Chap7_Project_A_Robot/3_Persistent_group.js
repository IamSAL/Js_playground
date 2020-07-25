
const customIterator=require('../Chap6_Secret_life_of_objects/3_Iterable_groups');

class PGroup{
    constructor() {
        this.members = [];
    }

    add(value){
        if (!this.has(value)){
            let tempG=[...this.members,value];
            return PGroup.from(tempG);
        }else{
            return this;
        }
    }

    addFrom(value){
        if (!this.has(value)){
            this.members.push(value);
        }
    }
    delete(value){
        if(this.has(value)){
            let index=this.members.indexOf(value);
            return PGroup.from(this.members.slice(0,index).concat(this.members.slice(index+1,this.members.length)));
        }else{
            return this;
        }
    }
    has(value){
        return this.members.indexOf(value) !== -1;
    }

    static from(iterable){
        let grp=new PGroup();
        for(let iteration of iterable){
            grp.addFrom(iteration);
        }
        return grp;
    }

    [Symbol.iterator]=function () {
        return new customIterator(this);
    }
}

PGroup.empty=PGroup.from([]);

//testing
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false