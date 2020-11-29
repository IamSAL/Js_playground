
let replaceByAlt=()=>{
    let images=document.getElementsByTagName('img');
    let imagesArr=Array.from(images);
    for(let image of imagesArr){
        console.log(image.alt);
        image.parentElement.replaceChild(createElements(image.alt||"ALT"),image)
        image.remove();
    }

    return true;
}

let createElements=(str)=>{
        return document.createTextNode(str)
}

function elt(type,...childs){
    let node=document.createElement(type);
    for(let child of childs){
        console.log(child + typeof child)
        if(typeof child!="string"){
            node.appendChild(child)
        }else{
            node.appendChild(document.createTextNode(child))
        }
    }
    return node;
    }

function setAuthor(){
    let quote=document.getElementById("quote")
    quote.appendChild(elt("footer",elt("h3","-",
        quote.getAttribute("data-name")),
        elt("p",elt("em",quote.getAttribute("data-date")))))}


