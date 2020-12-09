

generateTrails(Math.random()*300+5);

function createTrail(X=Math.random()*innerWidth+1,Y=Math.random()*innerHeight+1,Size=Math.random()*20+1,Color=getRandomColor()){
    let trail=document.createElement('div');
    trail.style.position='absolute';
    trail.className=`animate__animated animate__`+animateClasses[Math.round(Math.random()*animateClasses.length)];
    trail.style.top=Y+'px';
    trail.style.left=X+'px';
    trail.style.opacity=Math.random();
    trail.style.padding=Size+'px';
    if(Math.random()>0.3){
        trail.style.borderRadius=Math.random()*Size+50+'%';
    }
    if(Math.random()>0.9){
        trail.classList.add('trail');
    }
    trail.style.backgroundColor=Color;
    document.querySelector('.root').appendChild(trail);
}

window.addEventListener('keydown',next)
window.addEventListener('touchstart',next)
window.addEventListener('touchend',next)
function next(e){
        if(e.key==="ArrowUp" || e.key==="ArrowDown" ||e.touches){
            document.querySelector('.root').innerHTML='';
            generateTrails(Math.random()*100+15);
        }
}
function generateTrails(numbers){
    for(let i=0;i<=numbers;i++){
        setTimeout(createTrail,Math.random()*2000);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let movetrails=(e)=>{
    let trails=document.querySelectorAll('.trail');
    trails.forEach(trail=>{
        trail.style.top=e.clientY+250+'px';
        trail.style.left=e.clientX+Math.random()*20+50+'px';
        trail.style.transition=Math.random()+'s';
        trail.style.boxShadow=`7px 10px 20px rgba(0, 0, 0, 0.2)`;
    })
}

document.querySelector('.root').addEventListener('mousemove',movetrails);




var animateClasses=["swing","heartBeat","Back entrances","backInDown","backInLeft","backInRight","Bouncing entrances","bounceInUp","Bouncing exits","bounceOut","bounceOutDown","bounceOutLeft","bounceOutRight","bounceOutUp","Fading entrances","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","fadeInTopLeft","fadeInTopRight","fadeInBottomLeft","fadeInBottomRight","Fading exits","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig","fadeOutTopLeft","fadeOutTopRight","fadeOutBottomRight","fadeOutBottomLeft","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","fadeInTopLeft","fadeInTopRight","fadeInBottomLeft","fadeInBottomRight","Fading exits","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig","fadeOutTopLeft","fadeOutTopRight","fadeOutBottomRight","fadeOutBottomLeft","Flippers","Lightspeed","lightSpeedInRight","lightSpeedInLeft","lightSpeedOutRight","lightSpeedOutLeft","Rotating entrances","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","Rotating exits","rotateOut","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp","Sliding entrances","slideInDown","slideInLeft","slideInRight","slideInUp","Sliding exits","slideOutDown","slideOutLeft","slideOutRight","slideOutUp"]