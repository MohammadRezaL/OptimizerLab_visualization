class SBOA {

    constructor() {

        this.name =
            "Secretary Bird Optimization Algorithm";

        this.shortName = "SBOA";

        this.authors = "Fu et al.";

        this.year = "2024";

        this.type = "Swarm Intelligence";

        this.agents = [];

        this.bestAgent = null;

        this.phase = 1;

        this.iteration = 0;

        this.population = 30;

        this.dimensionMin = -10;

        this.dimensionMax = 10;
    }

    initialize(population, objectiveFunction) {

        this.population = population;

        this.objectiveFunction =
            objectiveFunction;

        this.agents = [];

        this.iteration = 0;

        this.phase = 1;

        for (let i = 0; i < population; i++) {

            const x =
                this.random(
                    this.dimensionMin,
                    this.dimensionMax
                );

            const y =
                this.random(
                    this.dimensionMin,
                    this.dimensionMax
                );

            this.agents.push({

                x: x,

                y: y,

                fitness:
                    objectiveFunction(x, y),

                trail: []

            });

        }

        this.updateBest();
    }

    step() {

        switch (this.phase) {

            case 1:

                this.searchForPrey();

                this.phase = 2;

                break;

            case 2:

                this.attackPrey();

                this.phase = 3;

                break;

            case 3:

                this.escapeFromDanger();

                this.phase = 1;

                this.iteration++;

                break;
        }

        this.evaluatePopulation();
    }

    searchForPrey() {

        this.agents.forEach(agent => {

            const randomBird =
                this.getRandomAgent();

            const r1 = Math.random();

            const r2 = Math.random();

            const direction =
                Math.random() < 0.5 ? 1 : -1;

            agent.x =
                agent.x +
                direction *
                r1 *
                (
                    randomBird.x -
                    r2 * agent.x
                );

            agent.y =
                agent.y +
                direction *
                r1 *
                (
                    randomBird.y -
                    r2 * agent.y
                );

            this.boundary(agent);

        });

    }

    attackPrey() {

        this.agents.forEach(agent => {

            const r = Math.random();

            const spiral =
                Math.sin(
                    2 * Math.PI * r
                );

            const contraction =
                1 -
                (
                    this.iteration /
                    (
                        this.iteration +
                        10
                    )
                );

            agent.x =
                this.bestAgent.x +
                spiral *
                contraction *
                (
                    agent.x -
                    this.bestAgent.x
                );

            agent.y =
                this.bestAgent.y +
                spiral *
                contraction *
                (
                    agent.y -
                    this.bestAgent.y
                );

            this.boundary(agent);

        });

    }

    escapeFromDanger() {

        this.agents.forEach(agent => {

            const stepSize =
                0.1 *
                (
                    this.dimensionMax -
                    this.dimensionMin
                ) *
                (
                    1 /
                    Math.sqrt(
                        this.iteration + 1
                    )
                );

            const threat =
                this.getRandomAgent();

            agent.x =
                agent.x +
                stepSize *
                (
                    Math.random() - 0.5
                ) +
                Math.random() *
                (
                    agent.x -
                    threat.x
                ) *
                0.1;

            agent.y =
                agent.y +
                stepSize *
                (
                    Math.random() - 0.5
                ) +
                Math.random() *
                (
                    agent.y -
                    threat.y
                ) *
                0.1;

            this.boundary(agent);

        });

    }

    evaluatePopulation() {

        this.agents.forEach(agent => {

            agent.fitness =
                this.objectiveFunction(
                    agent.x,
                    agent.y
                );

        });

        this.updateBest();
    }

    updateBest() {

        this.bestAgent =
            this.agents[0];

        this.agents.forEach(agent => {

            if (
                agent.fitness <
                this.bestAgent.fitness
            ) {

                this.bestAgent = agent;

            }

        });

    }

    boundary(agent) {

        agent.x =
            Math.max(
                this.dimensionMin,
                Math.min(
                    this.dimensionMax,
                    agent.x
                )
            );

        agent.y =
            Math.max(
                this.dimensionMin,
                Math.min(
                    this.dimensionMax,
                    agent.y
                )
            );

    }

    random(min, max) {

        return (
            Math.random()
            *
            (max - min)
            + min
        );

    }

    getRandomAgent() {

        return this.agents[
            Math.floor(
                Math.random() *
                this.agents.length
            )
        ];

    }

    getAgents() {

        return this.agents;

    }

    getBest() {

        return this.bestAgent;

    }

    getPhase() {

        return this.phase;

    }

    getPhaseName() {

        switch (this.phase) {

            case 1:
                return "Search for Prey";

            case 2:
                return "Attack Prey";

            default:
                return "Escape from Danger";
        }

    }

    getEquation() {

        switch (this.phase) {

            case 1:
                return "Xi = Xi +/- r(Xk - rXi)";

            case 2:
                return "Xi = Xbest + sin(2*pi*r)(Xi - Xbest)";

            default:
                return "Xi = Xi + Random Escape Step";
        }

    }

    getIteration() {

        return this.iteration;

    }

}
