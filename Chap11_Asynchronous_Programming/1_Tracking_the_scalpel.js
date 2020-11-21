const {bigOak} = require("./crow-tech");
const {routeRequest,storage,anyStorage}=require("./11_async");


async function locateScalpel(nest){
    let current=nest.name;
    for(;;){
        let next=await anyStorage(nest,current,"scalpesl")
        if(next==current){
            return current;
        }
        current=next;
    }

}


function locateScalpel2(nest) {
    function loop(current) {
        return anyStorage(nest, current, "scalspel").then(next => {
                if (next == current) {
                    return current;
                } else {
                    return loop(next);
                }

            }
        )
        current = next;
    }
    return loop(nest.name);
}

locateScalpel(bigOak).then(console.log).catch(e=>console.log("Not Found"));

locateScalpel2(bigOak).then(res=>console.log(res)).catch(e=>console.log("Not Found2"));