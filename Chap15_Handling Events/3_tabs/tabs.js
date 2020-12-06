console.log(document.body.children);


function asTabs(node){
    let tabs=node.children;

    let tabContainer=document.createElement('div');
    tabContainer.className='tabs';
   for(let tab of tabs){
       tabContainer.appendChild(createTab(tab,tab.getAttribute('data-tabname'),tab.childNodes));

   }
    node.prepend(tabContainer);
}



function createTab(tab,name){
    tab.className=`option`;
    tab.id=name;
    let btn=document.createElement('button')
        btn.className='selection'
        btn.textContent=name;
        btn.addEventListener('click',e=>{
               document.querySelectorAll('.option').forEach(tab=>{tab.style.display="none"})
               Array.from( document.querySelectorAll(`.selection`)).map(btn=>{
                    if(btn.textContent===name){
                        btn.classList.add('active')
                    }else{
                        btn.classList.remove('active');
                    }
                })
               tab.style.display="block";
        } )
    return btn;
}