'use strict';
const assert = require('assert');
const rvo = require(`../build/Release/rvo2`);
const v1 = new rvo.Vector2(-1, 2);
const v2 = new rvo.Vector2(1, 2);
const abs = rvo.abs(v1);
const vv = new rvo.vectorvector(2);
vv[0] = v1;
vv[1] = v2;

function setupScenario(sim, goals, nbrAgents) {
  sim.setTimeStep(0.25);
  sim.setAgentDefaults(15.0, 10, 10.0, 10.0, 1.5, 2.0);

  /*
   * Add agents, specifying their start position, and store their goals on the
   * opposite side of the environment.
   */
  for (var i = 0; i < nbrAgents; ++i) {
    const v = new rvo.Vector2(200 * Math.cos(i * 2.0 * Math.PI / nbrAgents), 200 * Math.sin(i * 2.0 * Math.PI / nbrAgents));
    sim.addAgent(v);
    goals[i] = new rvo.Vector2(-v.x(), -v.y());
  }

  // const a1 = sim.addAgent(v1, 2, 4, 5, 5, 2, 6, v1);
  // const a2 = sim.addAgent(v2, 2, 4, 5, 5, 2, 6, v1);
}

function setPreferredVelocity(sim, goals) {
  for (var i = 0; i < sim.getNumAgents(); i++) {
    const goal = goals[i];
    const pos = sim.getAgentPosition(i);
    var goalVector = new rvo.Vector2(goal.x() - pos.x(), goal.y() - pos.y());

    if (rvo.absSq(goalVector) > 1.0) {
      goalVector = rvo.normalize(goalVector);
    }

    sim.setAgentPrefVelocity(i, goalVector);
  }
}

function reachedGoal(sim, goals) {
  /* Check if all agents have reached their goals. */
  for (var i = 0; i < sim.getNumAgents(); ++i) {
    const goal = goals[i];
    const pos = sim.getAgentPosition(i);
    var dist = new rvo.Vector2(pos.x() - goal.x(), pos.y() - goal.y());
    if (rvo.absSq(dist) > sim.getAgentRadius(i) * sim.getAgentRadius(i)) {
      return false;
    }
  }
  return true;
}

function main() {
  const nbrAgents = 250;
  // const sim = new libRVO.RVOSimulator(0.25, 1, 4, 5, 5, 1.5, 7);
  const sim = new rvo.RVOSimulator();
  const goals = new rvo.vectorvector(nbrAgents);

  setupScenario(sim, goals, nbrAgents);

  // sim.addObstacle(vv);
  var i = 0;
  do {
    if (++i % 10 === 0) {
      console.log('TIME: ' + i);
    }
    setPreferredVelocity(sim, goals);
    sim.doStep();
    // for (var j = 0; j < sim.getNumAgents(); j++) {
    //   const p = sim.getAgentPosition(j);
    //   console.log(j + ': ' + 'x = ' + p.x() + ', y = ' + p.y());
    // }
  } while (!reachedGoal(sim, goals));

  console.log('Done');
  process.exit(0);
}

main();