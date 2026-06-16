const canvas =
document.getElementById(
    "swarmCanvas"
);

const ctx =
canvas.getContext("2d");

/* =========================
   CANVAS
========================= */

function resizeCanvas() {

    canvas.width =
        canvas.clientWidth;

    canvas.height =
        canvas.clientHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* =========================
   SEARCH SPACE
========================= */

const MIN_BOUND = -10;
const MAX_BOUND = 10;

function mapX(x) {

    return (
        (x - MIN_BOUND)
        /
        (MAX_BOUND - MIN_BOUND)
    ) * canvas.width;

}

function mapY(y) {

    return (
        canvas.height
        -
        (
            (y - MIN_BOUND)
            /
            (MAX_BOUND - MIN_BOUND)
        ) * canvas.height
    );

}

/* =========================
   GRID
========================= */

function drawGrid() {

    const gridSize = 40;

    ctx.strokeStyle =
        "rgba(255,255,255,0.05)";

    ctx.lineWidth = 1;

    for (
        let x = 0;
        x < canvas.width;
        x += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(
            x,
            canvas.height
        );

        ctx.stroke();

    }

    for (
        let y = 0;
        y < canvas.height;
        y += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(
            canvas.width,
            y
        );

        ctx.stroke();

    }

}

/* =========================
   TRAILS
========================= */

function drawTrails(
    agents
) {

    agents.forEach(agent => {

        if (
            !agent.trail
        ) return;

        ctx.beginPath();

        for (
            let i = 0;
            i <
            agent.trail.length;
            i++
        ) {

            const point =
                agent.trail[i];

            const px =
                mapX(point.x);

            const py =
                mapY(point.y);

            if (i === 0) {

                ctx.moveTo(
                    px,
                    py
                );

            } else {

                ctx.lineTo(
                    px,
                    py
                );

            }

        }

        ctx.strokeStyle =
            "rgba(92,200,255,0.15)";

        ctx.lineWidth = 1.5;

        ctx.stroke();

    });

}

/* =========================
   AGENTS
========================= */

function drawAgents(
    agents
) {

    agents.forEach(agent => {

        if (
            !agent.trail
        ) {

            agent.trail = [];

        }

        agent.trail.push({

            x: agent.x,

            y: agent.y

        });

        if (
            agent.trail.length > 20
        ) {

            agent.trail.shift();

        }

        const cx =
            mapX(agent.x);

        const cy =
            mapY(agent.y);

        ctx.beginPath();

        ctx.arc(
            cx,
            cy,
            6,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#5cc8ff";

        ctx.fill();

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            "#5cc8ff";

        ctx.fill();

        ctx.shadowBlur = 0;

    });

}

/* =========================
   BEST AGENT
========================= */

function drawBestAgent(
    best
) {

    if (!best) return;

    const x =
        mapX(best.x);

    const y =
        mapY(best.y);

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        10,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#ffd166";

    ctx.shadowBlur = 20;

    ctx.shadowColor =
        "#ffd166";

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.lineWidth = 2;

    ctx.strokeStyle =
        "#ffffff";

    ctx.stroke();

}

/* =========================
   INFO PANEL UPDATE
========================= */

function updatePhaseUI() {

    document
    .querySelectorAll(
        ".pseudo-line"
    )
    .forEach(line => {

        line.classList.remove(
            "active"
        );

    });

    if (typeof optimizer === "undefined" || !optimizer) return;

    const phase = optimizer.getPhase();

    const phaseEl = document.getElementById(
        "phase" + phase + "-code"
    );

    if (phaseEl) phaseEl.classList.add("active");

    const phaseNameEl = document.getElementById("phaseName");
    const equationEl = document.getElementById("equationText");

    if (phaseNameEl && typeof optimizer.getPhaseName === "function") {
        phaseNameEl.textContent = optimizer.getPhaseName();
    }

    if (equationEl && typeof optimizer.getEquation === "function") {
        equationEl.textContent = optimizer.getEquation();
    }

}

/* =========================
   DRAW LOOP
========================= */

function render() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawGrid();

    if (
        typeof optimizer !==
        "undefined"
        &&
        optimizer
    ) {

        const agents =
            optimizer.getAgents();

        const best =
            optimizer.getBest();

        drawTrails(
            agents
        );

        drawAgents(
            agents
        );

        drawBestAgent(
            best
        );

        updatePhaseUI();

    }

    requestAnimationFrame(
        render
    );

}

render();