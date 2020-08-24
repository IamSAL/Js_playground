const {randomPick}=require('./robots');
const Graph=require('./Graph');
const {roads}=require('./roads');
const roadGraph=Graph.buildGraph(roads);
class VillageState {
    constructor(place,parcels) {
        this.place=place;
        this.parcels=parcels;
    }
    move(destination){
        if(!roadGraph[this.place].includes(destination)){
            return this;
        }else{
            let parcels=this.parcels.map(p=>{
                if(p.place!==this.place){
                    return p
                }
                return {place:destination,address:p.address};
            }).filter(p=>p.place!==p.address);

            return new VillageState(destination,parcels);
        }
    }

}

VillageState.random=function (parcelCount=5) {
    let parcels=[];
    for(let i=0;i<=parcelCount;i++){
        let address=randomPick(Object.keys(roadGraph));
        let place;
        do{
            place=randomPick(Object.keys(roadGraph));
        }while(place==address);

        parcels.push({place,address})
    }
    return new VillageState("Post Office", parcels);
};

function createState(place,parcels) {
    return new VillageState(place,parcels);
}

function createRandomState(parcelCount=5){
    return VillageState.random(parcelCount);
}
//console.log(VillageState.random(4));
module.exports={createState,createRandomState};