🧠 Swarm Intelligence Optimization Visualizer

An interactive web-based simulation platform for visualizing and comparing Swarm Intelligence optimization algorithms such as **SBOA (Secretary Bird Optimization Algorithm)** and **WaOA (Walrus Optimization Algorithm)**.



The project demonstrates how population-based metaheuristic algorithms explore and exploit a search space in real time using dynamic visualization.




**🚀 Features**

- Real-time swarm visualization using Canvas
- Step-by-step simulation of optimization process
- Two bio-inspired algorithms:
  - SBOA (Secretary Bird Optimization Algorithm)
  - WaOA (Walrus Optimization Algorithm)
- Multiple benchmark functions:
  - Sphere Function
  - Rastrigin Function
  - Ackley Function
- Live fitness tracking chart (Chart.js)
- Phase-based algorithm visualization
- Adjustable parameters:
  - Population size
  - Simulation speed
  - Maximum iterations
- Interactive controls (Play / Stop / Step / Reset)




🧮 Algorithms Overview

🦅 SBOA (Secretary Bird Optimization Algorithm)
A swarm intelligence algorithm inspired by the hunting behavior of secretary birds. It includes three phases:
- Search for prey
- Attack prey
- Escape from danger

🐋 WaOA (Walrus Optimization Algorithm)
A population-based metaheuristic inspired by walrus behavior:
- Feeding strategy
- Migration
- Predator escape




📊 Benchmark Functions

- Sphere Function (convex baseline)
- Rastrigin Function (multimodal, complex landscape)
- Ackley Function (many local minima)




🖥️ Technologies Used

- HTML5 Canvas
- JavaScript (ES6)
- Chart.js
- CSS3 (Dark UI)




📂 Project Structure

```
project/
├── index.html
├── app.js
├── visualizer.js
├── SBOA.js
├── WaOA.js
├── style.css
└── README.md
```





▶️ How to Run

```bash
git clone https://github.com/MohammadRezaL/OptimizerLab_visualization.git
cd OptimizerLab_visualization
```

Then open `index.html` in your browser (or use Live Server).





📈 Visualization

- Agents move in a bounded search space
- Best solution is highlighted
- Trails show movement history
- Fitness improves over time





🎯 Purpose

- Learning swarm intelligence algorithms
- Visualizing optimization behavior
- Comparing metaheuristic methods
- Educational & research use





