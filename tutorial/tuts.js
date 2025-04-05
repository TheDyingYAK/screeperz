
// This is the code provided in the tutorial of the game!
// <module.exports.loop = function  is the function that is exported and run by the server
//
//
//
// This code will spawn a creep from the spawner it was run from the console and not the script console
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');




<module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];  // select the creep Harvester1 and assign to a variable named creep
    var sources = creep.room.find(FIND_SOURCES); // 
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
}
