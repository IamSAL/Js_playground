class Group {
    constructor() {
        this.members = [];
    }

    add(value){
     if (!this.has(value)){
         this.members.push(value);
     }
    }
    delete(value){
      if(this.has(value)){
          let index=this.members.indexOf(value);
          this.members=this.members.slice(0,index).concat(this.members.slice(index+1,this.members.length));
      }
    }
    has(value){
        return this.members.indexOf(value) !== -1;
    }
    static from(iterable){
        let grp=new Group();
        for(let iteration of iterable){
            grp.add(iteration);
        }
        return grp;
    }
}

let g1=new Group();
g1.add(1);
g1.add(2);
g1.add(3);
g1.add(4);
g1.add(3);
g1.add(1);
g1.delete(3);
// console.log(g1.has(3));//false
// console.log(g1)

let g2=Group.from(["salman","any","sabbir","salman","any"])
g2.delete("salman")
// console.log(g2.has("any"))
// console.log(g2)
// console.log(g2 instanceof Group);

//export for next solution
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
    module.exports = Group;
if (typeof global != "undefined" && !global.Group)
    global.Group = Group;