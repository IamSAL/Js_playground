class Vec {
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }
    plus(vec){
        let x=this.x+vec.x;
        let y=this.y+vec.y;
        return new Vec(x,y);
    }
    minus(vec){
        let x=Math.abs(this.x-vec.x);
        let y=Math.abs(this.y-vec.y);
        return new Vec(x,y);
    }
    get length(){
        return Math.sqrt((this.y-0)**2+(this.x-0)**2)
    }
    
}

    let v1=new Vec(3,4);
    console.log(v1.length);

    let v2=v1.plus(new Vec(2,2));
    let v3=v2.minus(v1);
    console.log(v2.length);
