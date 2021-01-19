let canvas=document.querySelector("canvas");
let context=canvas.getContext("2d");

canvas.setAttribute("width",(window.innerWidth > 0) ? window.innerWidth : screen.width);
canvas.setAttribute("height",(window.innerHeight > 0) ? window.innerHeight : screen.height);
//rectangle
context.fillStyle=getRandomColor();
// context.fillRect(5,5,110,50);

//stroke
// context.strokeStyle="blue"
context.lineWidth=Math.random()+1;
// context.strokeRect(5,5,110,50)

//empty rect with only stroke
context.strokeStyle=getRandomColor();
// context.lineWidth=0.5;
// context.strokeRect(150,5,110,50)
// context.stroke();
//Paths
//window.addEventListener("mousemove",DrawBG);

function DrawBG(scale=20){ 
    
    context.lineWidth=scale/100;
    clear();
    context.strokeStyle='#000000';
    context.beginPath();
    let i=0;
    for(let y=0,x=0;y<canvas.height,x<canvas.width;x+=scale,y+=scale){
        
       
        context.moveTo(0,y);
        context.lineTo(canvas.width,y);
        context.moveTo(x,0);
        context.lineTo(x, canvas.height);
        let horizon=0;
        
        while(horizon<=canvas.width){
            
            context.font=`${scale/5}px Montserrat`;
            context.fillStyle='black'
            context.fillText(i,horizon+scale/4.5,y-scale/3)
            context.fillStyle='yellow'
            context.fillRect(horizon,y,scale,scale)
            i++;
            horizon+=scale;
        }

        
    }
    
    context.stroke();
    context.closePath();
   //console.log('called')
   
}


// let rotation=0;
// context.save();
// let scale = 1;
function zoom3(event,drawFunc,min=1,max=100,factor=1) {
    //context.save()
    factor=factor/100;
    scale += (event.deltaY) * (-factor);
    scale = Math.min(Math.max(min, scale), max);
   // context.translate(event.pageX,event.pageY);
    drawFunc()
    context.setTransform(scale, 0, 0, scale,0, 0);
    drawFunc()
    if(scale<2){
        context.setTransform(1, 0, 0, 1, 0, 0);
        drawFunc()
    }
    //context.restore()
    
  }
  

function zoomer(e,drawFunc){

    rotation>3?rotation=0:rotation+=1;
    if(rotation>0){
        context.scale(rotation,rotation)
        drawFunc();
    }else{
        context.setTransform(1, 0, 0, 1, 0, 0);
        drawFunc();
    }
   console.log({rotation})
}
function Drawgrid(){
    DrawBG(25)
}

function triangle(){
   clear();
    context.beginPath();
    // context.moveTo(50,10);
    // context.lineTo(10,70);
    // context.lineTo(90,70);

    context.moveTo(canvas.width/2,0);
    context.lineTo(0,canvas.height);
    context.lineTo(canvas.width,canvas.height);
    context.fill();
}

function curves(){
    clear();
    context.beginPath();
    context.moveTo(10,90);
    context.quadraticCurveTo(60,10,90,90);
    context.bezierCurveTo(130,130,130,-30,60,10);
    //context.lineTo(60,10);
    context.closePath();
    context.stroke();
}

function  arc(){
   clear();
    context.beginPath();
    context.arc(150,50,40,0.5*Math.PI,Math.PI,false);
    context.arc(150,50,40,Math.PI,6,false);
    context.stroke();
    console.log('arc drawn')
}

const results=[
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
]

function pieChart(data,cx,cy,r){
   clear();
    let total=data.reduce((sum,{count})=>sum+count,0)
    let currentAngle=-0.5*Math.PI;
    for(let result of data){
        context.font="28px Montserrat";
        context.fillStyle=result.color;
        context.fillText(result.name,cx,cy);
        let sliceAngle=(result.count / total) * 2 * Math.PI;
        context.beginPath();
        context.arc(cx,cy,r,currentAngle,currentAngle+sliceAngle);
        currentAngle+=sliceAngle;
        context.lineTo(cx,cy);
        context.fillStyle=result.color;
        context.fill();
        context.closePath();
    }
    console.log(total);

}

const drawImage=(init=5,limit=100,increment=10)=>{
   clear();
   let img=document.createElement('img');
   img.src='./athlete.jpg';
   img.addEventListener("load",()=>{
       for(let x=init;x<limit;x+=increment){
           context.drawImage(img,x,10);
       }
   })
}

const drawPlayer=(posX=0,posY=0,speed=880,scale=1,isMirrored=false)=>{
    clear();
    for(let i=0;i<1000;i++){
        clearInterval(i)
    }

    let img=document.createElement('img');
    img.src='./player.png';
    let spriteW=48,spriteH=60;


    img.addEventListener("load",()=>{

        clearInterval(0)
        let cycle=0;
        interval_id=setInterval(()=>{
            context.clearRect(posX, posY, spriteW*scale,spriteH*scale);
            context.drawImage(img,cycle*spriteW,0,spriteW,spriteH,posX,posY,spriteW*scale,spriteH*scale)
            cycle=(cycle+1)%8;
        },1000-speed)



        if(isMirrored){
            flipHorizontally(context,posX+spriteW*scale/2);
        }

    })
}

function flipHorizontally(context,around){
    context.translate(around,0);
    context.scale(-1,1);
    context.translate(-around,0);
}

// drawPlayer(500,100,undefined,2,false);
// flipHorizontally(context,600)
// context.resetTransform()
// context.fillRect(100,100,300,400)

function branch(length,angle,scale){
    context.fillRect(0,0,1,length);
    context.beginPath()
    context.fillStyle=getRandomColor();
    context.arc(0,length,2,0,7,true);
    context.fill()
    context.closePath();
    if(length<8) return;
    context.save();
    context.translate(0,length);
    context.rotate(-angle);
    branch(length*scale,angle,scale);
    context.rotate(2*angle);
    branch(length*scale,angle,scale);
    context.restore();
}


context.save()
context.translate(canvas.width/2,canvas.height)
context.rotate(3.2)
context.scale(1.45,1.45)

branch(100,0.5,0.8)


context.restore()



function  clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// window.addEventListener("wheel",(e)=>{
//     zoom3(e,Drawgrid,1,100,0.2)
// });


class CanvasDisplay{
    constructor(parent,level){
        this.canvas=document.createElement("canvas");
        this.canvas.width=Math.min(600,level.width*scale);
        this.canvas.height=Math.min(450,level.height*scale);
        parent.appendChild(this.canvas);
        this.cx=this.canvas.getContext("2d");

        this.flipPlayer=false;

        this.viewport={
            left:0,
            top:0,
            width:this.canvas.width/scale,
            height:this.canvas.height/scale
        };
    }


    clear(){
        this.canvas.remove();
    }

}

CanvasDisplay.prototype.syncState=function(state) {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
}

CanvasDisplay.prototype.updateViewport=function(state) {
    let view=this.viewport,margin=view.width/3;
    let player=state.player;
    let center=player.pos.plus(player.size.times(0.5));

    if(center.x<view.left+margin){
        view.left=Math.max(center.x-margin,0);
    }else if(center.x>view.left+view.width-margin){
        view.left=Math.min(center.x+margin-view.width,state.level.width-view.width)
    }
    if(center.y<view.top+margin){
        view.top=Math.max(center.y-margin,0);
    }else if(center.y>view.top+view.height-margin){
        view.top=Math.min(center.y+margin-view.height,state.level.height-view.height);
    }

}

CanvasDisplay.prototype.clearDisplay=function(status){
    if(status=="won"){
        this.cx.fillStyle="rgb(68, 191, 255)";
    }else if(status=="lost"){
        this.cx.fillStyle="rgb(44, 136, 214)";
    }else{
        this.cx.fillStyle="rgb(52, 166, 251)";
    }
    this.cx.fillRect(0,0,this.canvas.width,this.canvas.height);
}

let otherSprites=document.createElement("img");
otherSprites.src="./tiles.png"

CanvasDisplay.prototype.drawBackground=function(level){
    let {left,top,width,height}=this.viewport;
    let xStart=Math.floor(left);
    let xEnd=Math.ceil(left+width);
    let yStart=Math.floor(top);
    let yEnd=Math.ceil(top+height);
    for(let y=yStart;y<yEnd;y++){
        for(let x=xStart;x<xEnd;x++){
            let tile=level.rows[y][x];
            if(tile=="empty") continue;
            let screenX=(x-left)*scale;
            let screenY=(y-top*scale);
            let tileX=tile=="laval"?scale:0;
            this.cx.drawImage(otherSprites,tileX,0,scale,scale,screenX,screenY,scale,scale);
        }
    }
}

let playerSprites=document.createElement("img");
playerSprites.src="./player.png";
const playerXoverlap=4;

CanvasDisplay.prototype.drawPlayer=function(player,x,y,width,height){
    width+=playerXoverlap*2;
    x-=playerXoverlap;
    if(player.speed.x!=0){
        this.flipPlayer=player.speed.x<0;
    }
    let tile=8;
    if(player.speed.y !=0){
        tile=9;
    }else if(player.speed.x !=0){
        tile=Math.floor(Date.now()/60)%8;
    }
    this.cx.save();
    if(this.flipPlayer){
        flipHorizontally(this.cx,x+width/2);
    }

    let tileX=tile*width;
    this.cx.drawImage(playerSprites,tileX,0,width,height,x,x,width,height);
    this.cx.restore();
}

CanvasDisplay.prototype.drawActors=function(actors){
    for(let actor of actors){
        let width=actor.size.x*scale;
        let height=actor.size.y*scale;
        let x=(actor.pos.x-this.viewport.left)*scale;
        let y=(actor.pos.y-this.viewport.top)*scale;
        if(actor.type=="player"){
            this.drawPlayer(actor,x,y,width,height);
        }else{
            let tileX=(actor.type=="coin"?2:1)*scale;
            this.cx.drawImage(otherSprites,tileX,0,width,height,x,y,width,height)
        }
    }
}


// module.exports={
//     CanvasDisplay
// }