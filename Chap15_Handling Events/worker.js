// addEventListener("message",e=>{
//     postMessage(Math.round(e.data*e.data));
// })

addEventListener("message",e=>{
    postMessage(JSON.parse(e.data).email);
})