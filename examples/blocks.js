"use strict";
var index_1 = require("../lib/index");
var v1 = new index_1.Vector2(-1, 2);
var v2 = new index_1.Vector2(1, 2);
var v3 = v1.mul(3);
console.log("x: " + v3.x() + ", y: " + v3.y());
var v4 = v1.sub(v2);
console.log("x: " + v4.x() + ", y: " + v4.y());
var v5 = v1.add(v2);
console.log("x: " + v5.x() + ", y: " + v5.y());
function setupScenario(sim, goals) {
    sim.setTimeStep(0.25);
    sim.setAgentDefaults(15, 10, 5, 5, 2, 2);
    for (var i = 0; i < 5; ++i) {
        for (var j = 0; j < 5; ++j) {
            var index = sim.addAgent(new index_1.Vector2(55 + i * 10, 55 + j * 10));
            goals[index] = new index_1.Vector2(-75, -75);
            index = sim.addAgent(new index_1.Vector2(-55 - i * 10, 55 + j * 10));
            goals[index] = new index_1.Vector2(75, -75);
            index = sim.addAgent(new index_1.Vector2(55 + i * 10, -55 - j * 10));
            goals[index] = new index_1.Vector2(-75, 75);
            index = sim.addAgent(new index_1.Vector2(-55 - i * 10, -55 - j * 10));
            goals[index] = new index_1.Vector2(75, 75);
        }
    }
    var obstacle1 = new index_1.vectorvector(4), obstacle2 = new index_1.vectorvector(4), obstacle3 = new index_1.vectorvector(4), obstacle4 = new index_1.vectorvector(4);
    obstacle1[0] = new index_1.Vector2(-10, 40);
    obstacle1[1] = new index_1.Vector2(-40, 40);
    obstacle1[2] = new index_1.Vector2(-40, 10);
    obstacle1[3] = new index_1.Vector2(-10, 10);
    obstacle2[0] = new index_1.Vector2(10, 40);
    obstacle2[1] = new index_1.Vector2(10, 10);
    obstacle2[2] = new index_1.Vector2(40, 10);
    obstacle2[3] = new index_1.Vector2(40, 40);
    obstacle3[0] = new index_1.Vector2(10, -40);
    obstacle3[1] = new index_1.Vector2(40, -40);
    obstacle3[2] = new index_1.Vector2(40, -10);
    obstacle3[3] = new index_1.Vector2(10, -10);
    obstacle4[0] = new index_1.Vector2(-10, -40);
    obstacle4[1] = new index_1.Vector2(-10, -10);
    obstacle4[2] = new index_1.Vector2(-40, -10);
    obstacle4[3] = new index_1.Vector2(-40, -40);
    sim.addObstacle(obstacle1);
    sim.addObstacle(obstacle2);
    sim.addObstacle(obstacle3);
    sim.addObstacle(obstacle4);
    sim.processObstacles();
}
function updateVisualization(sim) {
    var time = sim.getGlobalTime();
    console.log("Time: " + time);
    for (var i = 0; i < sim.getNumAgents(); ++i) {
        var p = sim.getAgentPosition(i);
        console.log("#" + i + ") x: " + p.x() + ", y: " + p.y());
    }
}
function setPreferredVelocity(sim, goals) {
    for (var i = 0; i < sim.getNumAgents(); i++) {
        var delta = goals[i].sub(sim.getAgentPosition(i));
        var angle = Math.random() * 2.0 * Math.PI;
        var dist = Math.random() * 0.0001;
        var goalVector = new index_1.Vector2(delta.x() + dist * Math.cos(angle), delta.y() + dist * Math.sin(angle));
        if (index_1.absSq(goalVector) > 1.0) {
            goalVector = index_1.normalize(goalVector);
        }
        sim.setAgentPrefVelocity(i, goalVector);
    }
}
function reachedGoal(sim, goals) {
    for (var i = 0; i < sim.getNumAgents(); ++i) {
        var dist = sim.getAgentPosition(i).sub(goals[i]);
        if (index_1.absSq(dist) > 400) {
            return false;
        }
    }
    return true;
}
function main(debug) {
    if (debug === void 0) { debug = false; }
    var nbrAgents = 100;
    var sim = new index_1.RVOSimulator();
    var goals = new index_1.vectorvector(nbrAgents);
    setupScenario(sim, goals);
    var i = 0;
    do {
        if (++i % 10 === 0) {
            console.log('TIME: ' + i);
        }
        setPreferredVelocity(sim, goals);
        if (debug) {
            updateVisualization(sim);
        }
        sim.doStep();
    } while (!reachedGoal(sim, goals));
    console.log('Done');
}
main();
//# sourceMappingURL=blocks.js.map