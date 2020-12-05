// window.addEventListener('mousemove',windowClick);
// window.addEventListener('click',windowClick);
let circle=document.querySelector('.circle')

function windowClick(e){
    circle.style.top=e.clientY+'px';
    circle.style.left=e.clientX+'px';
    if(e.target.nodeName==='A'){
        circle.style.backgroundColor='yellow';

    }else {
        circle.style.backgroundColor='gray';
    }
    let dots=document.querySelectorAll('.dot');
    dots.forEach(dot=>{
        let top=dot.style.top.slice(0,dot.style.top.length-2);
        let left=dot.style.left.slice(0,dot.style.left.length-2);
        if((top<e.clientY+circle.offsetHeight && top>e.clientY) && (left<e.clientX+circle.offsetWidth && left>e.clientX)){
            circle.style.backgroundColor='red';
            dot.remove();
            circle.style.transition='0.5s';
            circle.style.height=parseInt(circle.offsetHeight)+1+'px';
            circle.style.width=parseInt(circle.offsetWidth)+1+'px';
            circle.style.transition='0s';
        }
    })

}
// window.addEventListener("click", event => {
//     let dot = document.createElement("div");
//     dot.className = "dot";
//     dot.style.background=getRandomColor();
//     dot.style.left = (event.pageX - 4) + "px";
//     dot.style.top = (event.pageY - 4) + "px";
//     document.body.appendChild(dot);
// });

try{
    document.getElementsByClassName('second')[0].addEventListener('mousedown',(e)=>{
        if(parseInt(e.button)===2){
            e.stopPropagation();
        }

        console.log('b clicked')



    })
    document.getElementsByClassName('first')[0].addEventListener('mousedown',(e)=>{
        console.log('p clicked')

    })
}catch (e){
    console.log("error");
}

document.getElementsByClassName('buttons')[0].addEventListener('click',(e)=>{
   if(e.target.nodeName==='BUTTON'){
       console.log(e.target.innerText);
   }


})


document.querySelector('.link').addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(`No, you can't`)

})
window.addEventListener('keypress',(e)=>{
    if(e.key.toLowerCase()==='l' ){
        document.body.className='light';
    }else if(e.key.toLowerCase()==='d'){
        document.body.className='dark';
    }

})

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.querySelector('.dbclick').addEventListener('dblclick',()=>{
    document.body.style.backgroundColor=getRandomColor();
    console.log('test')})
let lastX;
let bar=document.querySelector('.bar');
bar.addEventListener('mousedown',(event)=>{
    if (event.button == 0) {
        lastX = event.clientX;
        window.addEventListener("mousemove", changeWidth);
        event.preventDefault(); // Prevent selection
    }

})

function changeWidth(event){

    if (event.buttons == 0) {
        window.removeEventListener("mousemove", changeWidth);
    } else {
        let dist = event.clientX - lastX;
        let newWidth = Math.max(10, bar.offsetWidth + dist);
        bar.style.width = newWidth + "px";
        lastX = event.clientX;
    }

}

window.removeEventListener('click',windowClick);