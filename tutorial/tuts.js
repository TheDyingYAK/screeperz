
// This is the code provided in the tutorial of the game!
// <module.exports.loop = function  is the function that is exported and run by the server
//
//
//
// This code will spawn a creep from the spawner it was run from the console and not the script console
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');



// This will take the creep names 'Harvester1' and fund the resources in the room that the creep is in then harvest resources if it is not in range it will move to the resouece so it is in range
<module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];  // select the creep Harvester1 and assign to a variable named creep
    var sources = creep.room.find(FIND_SOURCES); // find resources in the same room that 'Harvester1' is in 
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // harvest resources if an error is produced it will move to the resources
        creep.moveTo(sources[0]); // moce to the resource
    }
}



// modified code so the creep can move back to the spawn and deliver resouces
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];

    if(creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    else {
        if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
            creep.moveTo(Game.spawns['Spawn1']);
        }
    }
}



// spawn a second screep but with a second move part so it moves faster per tick
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE, MOVE], 'Harvester2' );




// funvtion that uses a for loop for all creeps on the server
module.exports.loop = function () {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
}




/*
Now let's improve our code by taking the workers' behavior out into a separate module. Create a module called role.harvester with the help of the Modules section on the left of the script editor and define a run function inside the module.exports object, containing the creep behavior.

Create a role.harvester module.
Documentation:
Organizing scripts using modules
*/


var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = roleHarvester;




/*
Now you can rewrite the main module code, leaving only the loop and a call to your new module by the method require('role.harvester').

Include the role.harvester module in the main module.
 Code (main)

*/

var roleHarvester = require('role.harvester');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}
