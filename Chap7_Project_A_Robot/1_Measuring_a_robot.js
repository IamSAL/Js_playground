const runRobot=require('./A_robot.js');


function compareRobots(memory,...robots) {
    let tasks=[];
    let performance=new Array(robots.length).fill(0);
    for(let i=0;i<100;i++){
        tasks.push(VillageState.random())
    }
    tasks.forEach(task=>{
        robots.forEach((robot,index)=>{
            performance[index]+=runRobot(task,robot,memory);
        });
    });

    return performance.map(turns=>turns/100)
}


//export for next solution
module.exports=runRobot;
global.runRobot = runRobot;
global.VillageState = VillageState;
global.roadGraph= roadGraph;
global.goalOrientedRobot=goalOrientedRobot;
global.randomRobot=randomRobot;
global.routeRobot=routeRobot;
global.mailRoute=mailRoute;
global.compareRobots=compareRobots;
global.findRoute=findRoute;
