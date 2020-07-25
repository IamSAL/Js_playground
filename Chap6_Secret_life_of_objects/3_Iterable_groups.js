const Group=require('./2_Groups');
// console.log(Group);

Group.prototype[Symbol.iterator]=function () {
    return new customIterator(this);
};
class customIterator{
    constructor(group) {
        this.index=0;
        this.group=group;
    }
    next(){
        if (this.index>=this.group.members.length){
            return {done:true}
        }
        let value={
            index:this.index,
            value:this.group.members[this.index]
        };
        this.index++;
        return {value,done:false}
    }
}

// let gNew=Group.from([1,2,2,3,4,7,3,5,6,8,6,9,10,11,20,11]);
// console.log(gNew);
// for(let val of gNew){
//     console.log(val);
// }

module.exports=customIterator;
    global.customIterator=customIterator;



