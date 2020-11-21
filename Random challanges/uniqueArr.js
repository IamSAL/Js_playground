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

let group=new Group();
let myArr=[4,6,9,4,8,6,8];
for(let i=0;i<myArr.length;i++){
   group.add(myArr[i]);
}
//unique array
console.log(Array.from(group.members));


//
let myArr2=[4,6,9,4,8,6,8];
let uniqueArr=[];

for(let i=0;i<myArr2.length;i++){
    if(uniqueArr.indexOf(myArr2[i]) == -1){
        uniqueArr.push(myArr2[i]);
    }
}

console.log(uniqueArr);