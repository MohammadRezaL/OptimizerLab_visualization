class WaOA {

    constructor() {

        this.name =
            "Walrus Optimization Algorithm";

        this.shortName =
            "WaOA";

        this.authors =
            "Trojovský & Dehghani";

        this.year =
            "2023";

        this.type =
            "Swarm Intelligence";

        this.description =
            "A bio-inspired population-based metaheuristic algorithm that mimics the feeding, migration, and predator escape behaviors of walruses.";

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

                this.feedingStrategy();

                this.phase = 2;

                break;

            case 2:

                this.migration();

                this.phase = 3;

                break;

            case 3:

                this.predatorEscape();

                this.phase = 1;

                this.iteration++;

                break;
        }

        this.evaluatePopulation();
    }

    feedingStrategy() {

        this.agents.forEach(agent => {

            const r1 = Math.random();

            const r2 = Math.random();

            agent.x =
                agent.x +
                r1 *
                (
                    this.bestAgent.x -
                    r2 * agent.x
                );

            agent.y =
                agent.y +
                r1 *
                (
                    this.bestAgent.y -
                    r2 * agent.y
                );

            this.boundary(agent);

        });

    }

    migration() {

        this.agents.forEach(agent => {

            const randomWalrus =
                this.agents[
                    Math.floor(
                        Math.random() *
                        this.agents.length
                    )
                ];

            const r = Math.random();

            agent.x +=
                r *
                (
                    randomWalrus.x -
                    agent.x
                );

            agent.y +=
                r *
                (
                    randomWalrus.y -
                    agent.y
                );

            this.boundary(agent);

        });

    }

    predatorEscape() {

        this.agents.forEach(agent => {

            const radius = 0.5;

            agent.x +=
                (Math.random() - 0.5)
                * radius;

            agent.y +=
                (Math.random() - 0.5)
                * radius;

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
                return "Feeding Strategy";

            case 2:
                return "Migration";

            default:
                return "Predator Escape";

        }

    }

    getEquation() {

        switch (this.phase) {

            case 1:
                return "Xi = Xi + r(SW − Xi)";

            case 2:
                return "Xi = Xi + r(Xk − Xi)";

            default:
                return "Xi = Xi + Local Search";

        }

    }

    getIteration() {

        return this.iteration;

    }

}