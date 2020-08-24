const {roads,mailRoute}=require('./roads');
const Graph=require('./Graph');
var roadGraph=Graph.buildGraph(roads);
function setRoadGraph(roads){
    roadGraph=Graph.buildGraph(roads);
};

function runRobot(state,robot,memory){
    for(let turn=0;;turn++){
        if(state.parcels.length==0){
            return turn;
            // break;
        }
        let action=robot(state,memory);
        state=state.move(action.direction);
        memory=action.memory;
        // console.log(`Moved to ${action.direction}`);
    }

}

function randomPick(array) {
    let choice=Math.floor(Math.random()*array.length);
    return array[choice];

}

function randomRobot(state) {
    return {direction:randomPick(roadGraph[state.place])};
}


function routeRobot(state,memory) {
    if(memory.length==0){
        memory=mailRoute;
    }
    return {direction: memory[0],memory:Array.from(memory).slice(1)};
}


function findRoute(graph,from,to){
    let work=[{at:from, route:[]}];
    for(let i=0;i<work.length;i++){
        let {at, route}=work[i];
        for(let place of graph[at]){
            if(place===to) return route.concat(place);
            if(!work.some(w=>w.at==place)){
                work.push({at:place,route: route.concat(place)})
            }
        }
    }
    return work;
}
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: Array.from(route).slice(1)};
}

module.exports={runRobot,randomPick,randomRobot,routeRobot,goalOrientedRobot,setRoadGraph};