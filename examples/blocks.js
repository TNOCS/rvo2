'use strict';
const assert = require('assert');
const rvo = require(`../build/Release/rvo2`);

// Some examples of vector functions.
const v1 = new rvo.Vector2(-1, 2);
const v2 = new rvo.Vector2(1, 2);
const v3 = v1.mul(3);  // -3, 6
const v4 = v1.sub(v2); // -2, 0
const v5 = v1.add(v2); //  0, 4

function setupScenario(sim, goals) {
  sim.setTimeStep(0.25);
 	/* Specify the default parameters for agents that are subsequently added. */
  sim.setAgentDefaults(15, 10, 5, 5, 2, 2);

	/*
	 * Add agents, specifying their start position, and store their goals on the
	 * opposite side of the environment.
	 */
	for (var i = 0; i < 5; ++i) {
		for (var j = 0; j < 5; ++j) {
			var index = sim.addAgent(new rvo.Vector2(55 + i * 10,  55 + j * 10));
			goals[index] = new rvo.Vector2(-75, -75);

			index = sim.addAgent(new rvo.Vector2(-55 - i * 10,  55 + j * 10));
			goals[index] = new rvo.Vector2(75, -75);

			index = sim.addAgent(new rvo.Vector2(55 + i * 10, -55 - j * 10));
			goals[index] = new rvo.Vector2(-75, 75);

			index = sim.addAgent(new rvo.Vector2(-55 - i * 10, -55 - j * 10));
			goals[index] = new rvo.Vector2(75, 75);
		}
	}

	/*
	 * Add (polygonal) obstacles, specifying their vertices in counterclockwise
	 * order.
	 */
	const obstacle1 = new rvo.vectorvector(4)
    , obstacle2 = new rvo.vectorvector(4)
    , obstacle3 = new rvo.vectorvector(4)
    , obstacle4 = new rvo.vectorvector(4);

	obstacle1[0] = new rvo.Vector2(-10, 40);
	obstacle1[1] = new rvo.Vector2(-40, 40);
	obstacle1[2] = new rvo.Vector2(-40, 10);
	obstacle1[3] = new rvo.Vector2(-10, 10);

	obstacle2[0] = new rvo.Vector2(10, 40);
	obstacle2[1] = new rvo.Vector2(10, 10);
	obstacle2[2] = new rvo.Vector2(40, 10);
	obstacle2[3] = new rvo.Vector2(40, 40);

	obstacle3[0] = new rvo.Vector2(10, -40);
	obstacle3[1] = new rvo.Vector2(40, -40);
	obstacle3[2] = new rvo.Vector2(40, -10);
	obstacle3[3] = new rvo.Vector2(10, -10);

	obstacle4[0] = new rvo.Vector2(-10, -40);
	obstacle4[1] = new rvo.Vector2(-10, -10);
	obstacle4[2] = new rvo.Vector2(-40, -10);
	obstacle4[3] = new rvo.Vector2(-40, -40);

	sim.addObstacle(obstacle1);
	sim.addObstacle(obstacle2);
	sim.addObstacle(obstacle3);
	sim.addObstacle(obstacle4);

	/* Process the obstacles so that they are accounted for in the simulation. */
	sim.processObstacles();
}

function updateVisualization(sim)
{
	/* Output the current global time. */
	const time = sim.getGlobalTime();

	/* Output the current position of all the agents. */
	for (var i = 0; i < sim.getNumAgents(); ++i) {
    const p = sim.getAgentPosition(i);
    console.log(i + ': ' + 'x = ' + p.x() + ', y = ' + p.y());
  }
}

function setPreferredVelocity(sim, goals) {
  for (var i = 0; i < sim.getNumAgents(); i++) {
    const delta = goals[i].sub(sim.getAgentPosition(i));

		/*
		 * Perturb a little to avoid deadlocks due to perfect symmetry.
		 */
		const angle = Math.random() * 2.0 * Math.PI;
		const dist = Math.random() * 0.0001;

    var goalVector = new rvo.Vector2(delta.x() + dist * Math.cos(angle), delta.y() + dist * Math.sin(angle));

    if (rvo.absSq(goalVector) > 1.0) {
      goalVector = rvo.normalize(goalVector);
    }

    sim.setAgentPrefVelocity(i, goalVector);
  }
}

function reachedGoal(sim, goals) {
  /* Check if all agents have reached their goals. */
  for (var i = 0; i < sim.getNumAgents(); ++i) {
    const dist = sim.getAgentPosition(i).sub(goals[i]);
    if (rvo.absSq(dist) > 400) { // 400 <= 20 x 20
      return false;
    }
  }
  return true;
}

function main() {
  const nbrAgents = 100;
  // const sim = new libRVO.RVOSimulator(0.25, 1, 4, 5, 5, 1.5, 7);
  const sim = new rvo.RVOSimulator();
  const goals = new rvo.vectorvector(nbrAgents);

  setupScenario(sim, goals);

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