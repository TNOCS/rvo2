"use strict";
var rvo2_1 = require("../rvo2/rvo2");
var v1 = new rvo2_1.Vector2(-1, 2);
var v2 = new rvo2_1.Vector2(1, 2);
var length = rvo2_1.abs(v1);
console.log(length);
var vv = new rvo2_1.vectorvector(2);
vv[0] = v1;
vv[1] = v2;
function setupScenario(sim, goals, nbrAgents) {
    sim.setTimeStep(0.25);
    sim.setAgentDefaults(15.0, 10, 10.0, 10.0, 1.5, 2.0);
    for (var i = 0; i < nbrAgents; ++i) {
        var v = new rvo2_1.Vector2(200 * Math.cos(i * 2.0 * Math.PI / nbrAgents), 200 * Math.sin(i * 2.0 * Math.PI / nbrAgents));
        sim.addAgent(v);
        goals[i] = new rvo2_1.Vector2(-v.x(), -v.y());
    }
}
function setPreferredVelocity(sim, goals) {
    for (var i = 0; i < sim.getNumAgents(); i++) {
        var goal = goals[i];
        var pos = sim.getAgentPosition(i);
        var goalVector = new rvo2_1.Vector2(goal.x() - pos.x(), goal.y() - pos.y());
        if (rvo2_1.absSq(goalVector) > 1.0) {
            goalVector = rvo2_1.normalize(goalVector);
        }
        sim.setAgentPrefVelocity(i, goalVector);
    }
}
function reachedGoal(sim, goals) {
    for (var i = 0; i < sim.getNumAgents(); ++i) {
        var goal = goals[i];
        var pos = sim.getAgentPosition(i);
        var dist = new rvo2_1.Vector2(pos.x() - goal.x(), pos.y() - goal.y());
        if (rvo2_1.absSq(dist) > sim.getAgentRadius(i) * sim.getAgentRadius(i)) {
            return false;
        }
    }
    return true;
}
function main() {
    var nbrAgents = 250;
    var sim = new rvo2_1.RVOSimulator();
    var goals = new rvo2_1.vectorvector(nbrAgents);
    setupScenario(sim, goals, nbrAgents);
    var i = 0;
    do {
        if (++i % 10 === 0) {
            console.log('TIME: ' + i);
        }
        setPreferredVelocity(sim, goals);
        sim.doStep();
    } while (!reachedGoal(sim, goals));
    console.log('Done');
}
main();
//# sourceMappingURL=circle.js.map