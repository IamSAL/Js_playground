let balloon=document.querySelector('.balloon');
window.addEventListener('keydown',pumper)

function pumper(e){
    let oldSize=getComputedStyle(balloon).fontSize.slice(0,getComputedStyle(balloon).fontSize.length-2);
    document.querySelector('.result').textContent=oldSize;
    if(e.key==='ArrowUp'){
        let newSize=parseInt(oldSize)+((20*oldSize)/100)
        if(newSize>450){
            balloon.innerHTML='💥';
            window.removeEventListener('keydown',pumper);
            document.querySelector('.result').textContent='BOOM!';
        }else{
            balloon.style.fontSize=newSize+'px';
        }
    }else if(e.key==='ArrowDown'){
        balloon.style.fontSize=parseInt(oldSize)-((20*oldSize)/100)+'px';
    }
}