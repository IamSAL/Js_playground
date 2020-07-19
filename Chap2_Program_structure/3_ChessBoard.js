let gridSize=prompt('Enter Grid Size:');
let lines=[''];
let chessboard=document.createElement('table');
chessboard.classList.add('chessTable');
for(let i=0;i<gridSize;i++){
    let tr=document.createElement('tr');
    for(j=0;j<gridSize;j++){
        if(j%2==0){
            if(i%2==0){
                let td=document.createElement('td');
                td.classList.add('black');
                tr.appendChild(td);
                
            }else{
                let td4=document.createElement('td');
                td4.classList.add('white');
                tr.appendChild(td4);
            } 
        }else{
            if(i%2!=0){
                let td2=document.createElement('td');
         
                td2.classList.add('black');
                tr.appendChild(td2);
            }else{
                let td3=document.createElement('td');
                td3.classList.add('white');
          
                tr.appendChild(td3);
            }
        }  
    }
chessboard.appendChild(tr);
}

document.body.appendChild(chessboard);



var css = `table.chessTable {
    width: 100%;
 
    height: 100%;
    /* border: 1px solid; */
}

td.black {
    padding: 5px;
    text-align: center;
    background-color: #292929;
    height: 50px;
}

td.white {
    padding: 5px;
    text-align: center;
    background-color: whitesmoke;
}`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

//for taking input in node
// process.stdin.on('data',function(data){
//     gridSize=data;
//     console.log('Your data:'+gridSize);
// })

