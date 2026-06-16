let optimizer;

let playing = false;

let simulationInterval = null;

let simulationSpeed = 200;

let fitnessChart;

/* =========================
   BENCHMARK FUNCTIONS
========================= */

function sphere(x, y) {

    return x * x + y * y;

}

function rastrigin(x, y) {

    return (
        20
        +
        x * x
        -
        10 *
        Math.cos(
            2 * Math.PI * x
        )
        +
        y * y
        -
        10 *
        Math.cos(
            2 * Math.PI * y
        )
    );

}

function ackley(x, y) {

    return (
        -20 *
        Math.exp(
            -0.2 *
            Math.sqrt(
                0.5 *
                (
                    x * x +
                    y * y
                )
            )
        )
        -
        Math.exp(
            0.5 *
            (
                Math.cos(
                    2 * Math.PI * x
                )
                +
                Math.cos(
                    2 * Math.PI * y
                )
            )
        )
        +
        Math.E
        +
        20
    );

}

function getSelectedFunction() {

    const selected =
        document.getElementById(
            "functionSelect"
        ).value;

    switch (selected) {

        case "rastrigin":
            return rastrigin;

        case "ackley":
            return ackley;

        default:
            return sphere;
    }

}

/* =========================
   INITIALIZE
========================= */

function initializeSimulation() {

    const population =
        parseInt(
            document.getElementById(
                "populationSize"
            ).value
        );

    const selectedOpt = document.getElementById("optimizerSelect").value;

    if (selectedOpt === "sboa") {
        optimizer = new SBOA();
    } else {
        optimizer = new WaOA();
    }

    optimizer.initialize(
        population,
        getSelectedFunction()
    );

    // update algorithm info panel
    const algoNameEl = document.getElementById("algoName");
    const algoAuthorsEl = document.getElementById("algoAuthors");
    const algoYearEl = document.getElementById("algoYear");
    const algoTypeEl = document.getElementById("algoType");
    const currentAlgoEl = document.getElementById("currentAlgorithm");
    const activeAlgoEl = document.getElementById("activeAlgorithm");

    if (algoNameEl) algoNameEl.textContent = optimizer.name || optimizer.shortName || "";
    if (algoAuthorsEl) algoAuthorsEl.textContent = optimizer.authors || "";
    if (algoYearEl) algoYearEl.textContent = optimizer.year || "";
    if (algoTypeEl) algoTypeEl.textContent = optimizer.type || "";
    if (currentAlgoEl) currentAlgoEl.textContent = optimizer.shortName || optimizer.name || "";
    if (activeAlgoEl) activeAlgoEl.textContent = optimizer.shortName || optimizer.name || "";

    resetChart();

    updateUI();

}

/* =========================
   STEP
========================= */

function simulationStep() {

    const maxIterations =
        parseInt(
            document.getElementById(
                "maxIterations"
            ).value
        );

    if (
        optimizer.getIteration()
        >=
        maxIterations
    ) {

        stopSimulation();

        return;
    }

    optimizer.step();

    updateUI();

    updateChart(
        optimizer.getIteration(),
        optimizer.getBest().fitness
    );

}

/* =========================
   PLAY
========================= */

function startSimulation() {

    if (playing) return;

    playing = true;

    simulationInterval =
        setInterval(
            simulationStep,
            simulationSpeed
        );

}

/* =========================
   STOP
========================= */

function stopSimulation() {

    playing = false;

    clearInterval(
        simulationInterval
    );

}

/* =========================
   RESET
========================= */

function resetSimulation() {

    stopSimulation();

    initializeSimulation();

}

/* =========================
   UI
========================= */

function updateUI() {

    document.getElementById(
        "iterationValue"
    ).textContent =
        optimizer.getIteration();

    document.getElementById(
        "fitnessValue"
    ).textContent =
        optimizer
        .getBest()
        .fitness
        .toFixed(6);

    document.getElementById(
        "populationDisplay"
    ).textContent =
        optimizer.population;

    const activeEl = document.getElementById("activeAlgorithm");
    if (activeEl) activeEl.textContent = optimizer.shortName || optimizer.name || "";

}

/* =========================
   EVENTS
========================= */

document
.getElementById(
    "playBtn"
)
.addEventListener(
    "click",
    startSimulation
);

document
.getElementById(
    "stopBtn"
)
.addEventListener(
    "click",
    stopSimulation
);

document
.getElementById(
    "resetBtn"
)
.addEventListener(
    "click",
    resetSimulation
);

document
.getElementById(
    "stepBtn"
)
.addEventListener(
    "click",
    simulationStep
);

document
.getElementById(
    "speedSlider"
)
.addEventListener(
    "input",
    function() {

        simulationSpeed =
            parseInt(
                this.value
            );

        document.getElementById(
            "speedValue"
        ).textContent =
            simulationSpeed +
            " ms";

        if (playing) {

            stopSimulation();

            startSimulation();

        }

    }
);

/* =========================
   CHART
========================= */

fitnessChart =
new Chart(

    document.getElementById(
        "fitnessChart"
    ),

    {

        type: "line",

        data: {

            labels: [],

            datasets: [

                {

                    label:
                    "Best Fitness",

                    data: [],

                    borderColor:
                    "#5cc8ff",

                    tension: 0.2

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio:
            false

        }

    }

);

function updateChart(
    iteration,
    fitness
) {

    fitnessChart
    .data
    .labels
    .push(
        iteration
    );

    fitnessChart
    .data
    .datasets[0]
    .data
    .push(
        fitness
    );

    fitnessChart.update();

}

function resetChart() {

    fitnessChart
    .data
    .labels = [];

    fitnessChart
    .data
    .datasets[0]
    .data = [];

    fitnessChart.update();

}

document.getElementById(
    "currentAlgorithm"
).textContent = document.getElementById("optimizerSelect").value === 'sboa' ? 'SBOA' : 'WaOA';

// re-initialize when optimizer selection changes
document.getElementById("optimizerSelect").addEventListener("change", function() {
    resetSimulation();
});

document.getElementById(
    "activeAlgorithm"
).textContent = "WaOA";

/* =========================
   STARTUP
========================= */

initializeSimulation();