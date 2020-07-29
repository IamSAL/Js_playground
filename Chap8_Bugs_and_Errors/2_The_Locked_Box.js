const box={
    locked:true,
    unlock(){
        this.locked=false;
    },
    lock(){
        this.locked=true;
    },
    _content:[1,2,3,4,5],
    get content(){
        if (this.locked) throw new Error("Locked!");
        return this._content;
    },
    set content(arr){
        this._content=arr;
    }
};

function withBoxUnlocked(fn){
    let isUnlocked=false;
    if(box.locked===false){
        isUnlocked=true;
    }
    box.unlock();
    try{
        fn();
    }finally {
        if(!isUnlocked===true){
            box.lock();
        }
        console.log(box);
    }
}

console.log(withBoxUnlocked(()=>{
    box.content=[6,7,8,9];
    console.log("result: ",box)}));
