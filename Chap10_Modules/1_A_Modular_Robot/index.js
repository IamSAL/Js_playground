const {roads,mailRoute}=require('./roads');
const State=require('./VillageState');
const robots=require('./robots');
module.exports={
    roads,mailRoute,...State,...robots
};