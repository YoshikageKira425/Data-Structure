import { addFuctionToNode, connectElements, g } from "./index.js";
import { Graph } from "./structure.js";

const nodeContainer = document.getElementById("node-container");
const lineContainer = document.getElementById("line-container");

const screenW = window.innerWidth;
const screenH = window.innerHeight;

const centerX = screenW / 2;
const centerY = screenH / 2;

const presentGraphs = [
    {
        graph: (() => {
            const g = new Graph();
            g.addVertex("A");
            g.addVertex("B");
            g.addVertex("C");
            g.addEdge("A", "B");
            g.addEdge("B", "C");
            return g;
        })(),
        nodes: [
            { id: "node-A", text: "A", left: `${centerX - 200}px`, top: `${centerY}px` },
            { id: "node-B", text: "B", left: `${centerX}px`, top: `${centerY}px` },
            { id: "node-C", text: "C", left: `${centerX + 200}px`, top: `${centerY}px` }
        ]
    },
    {
        graph: (() => {
            const g = new Graph();
            g.addVertex("X");
            g.addVertex("Y");
            g.addVertex("Z");
            g.addVertex("W");
            g.addEdge("X", "Y");
            g.addEdge("Y", "Z");
            g.addEdge("Z", "W");
            g.addEdge("W", "X");
            return g;
        })(),
        nodes: [
            { id: "node-X", text: "X", left: `${centerX - 100}px`, top: `${centerY - 100}px` },
            { id: "node-Y", text: "Y", left: `${centerX + 100}px`, top: `${centerY - 100}px` },
            { id: "node-Z", text: "Z", left: `${centerX + 100}px`, top: `${centerY + 100}px` },
            { id: "node-W", text: "W", left: `${centerX - 100}px`, top: `${centerY + 100}px` }
        ]
    },
    {
        graph: (() => {
            const g = new Graph();
            g.addVertex("A");
            g.addVertex("B");
            g.addVertex("C");
            g.addVertex("D");
            g.addVertex("E")
            g.addVertex("Center");
            g.addEdge("B", "A");
            g.addEdge("A", "C");
            g.addEdge("C", "E");
            g.addEdge("E", "D");
            g.addEdge("D", "B");
            g.addEdge("Center", "A");
            g.addEdge("Center", "B");
            g.addEdge("Center", "C");
            g.addEdge("Center", "D");
            g.addEdge("Center", "E");
            return g;
        })(),
        nodes: [
            { id: "node-A", text: "A", left: `${centerX}px`, top: `${centerY-230}px` },
            { id: "node-B", text: "B", left: `${centerX - 230}px`, top: `${centerY - 100}px` },
            { id: "node-C", text: "C", left: `${centerX + 230}px`, top: `${centerY - 100}px` },
            { id: "node-D", text: "D", left: `${centerX - 150}px`, top: `${centerY + 150}px` },
            { id: "node-E", text: "E", left: `${centerX + 150}px`, top: `${centerY + 150}px` },
            { id: "node-Center", text: "Center", left: `${centerX}px`, top: `${centerY}px` }
        ]
    }
];


document.querySelectorAll("button").forEach(btn => {
    if (btn.textContent.includes("Present 1")) {
        btn.addEventListener("click", () => selectPresent(1));
    } else if (btn.textContent.includes("Present 2")) {
        btn.addEventListener("click", () => selectPresent(2));
    } else if (btn.textContent.includes("Present 3")) {
        btn.addEventListener("click", () => selectPresent(3));
    } else if (btn.textContent.includes("Reset")) {
        btn.addEventListener("click", reset);
    }
});

function reset() {
    nodeContainer.innerHTML = "";
    lineContainer.innerHTML = "";
}

function selectPresent(index) {
    reset();

    const present = presentGraphs[index - 1];
    if (!present || !present.nodes) return;

    present.nodes.forEach(n => {
        const node = document.createElement("div");
        node.className = "node select-none font-bold w-20 h-20 bg-purple-600 border-2 border-purple-800 text-white flex items-center justify-center rounded-full shadow-lg cursor-grab absolute";
        node.textContent = n.text;
        node.id = n.id;
        node.style.left = n.left;
        node.style.top = n.top;

        nodeContainer.appendChild(node);
        addFuctionToNode(node);
    });

    present.graph.getEdges().forEach(([from, to]) => {
        const el1 = document.getElementById(`node-${from}`);
        const el2 = document.getElementById(`node-${to}`);

        const line = document.createElement("div");
        line.className = "absolute select-none h-0.5 bg-red-500 transform-gpu origin-left";
        lineContainer.appendChild(line);

        connectElements(el1, el2, line);
    });

    g.updatedGraph(present.graph);
}
