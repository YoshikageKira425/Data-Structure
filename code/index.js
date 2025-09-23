import { Graph } from "./structure.js";

const g = new Graph();
const dragBox = document.getElementById("dragBox");

addFuctionToNode(dragBox);

let isDragging = false;
let offsetX, offsetY;
let activeNode = null;
let oldName;
let linkNode;

document.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("node"))
        return;

    const newElement = document.createElement("div");
    newElement.className = "node w-20 h-20 bg-blue-600 border-2 border-blue-800 text-white flex items-center justify-center rounded-full shadow-lg cursor-grab absolute";
    newElement.textContent = Math.random();

    newElement.style.left = `${e.clientX - 40}px`;
    newElement.style.top = `${e.clientY - 40}px`;

    document.body.appendChild(newElement);
    addFuctionToNode(newElement);
});

function addFuctionToNode(node) {
    g.addVertex(node.textContent);

    node.addEventListener("mousedown", (e) => {
        if (node.isContentEditable)
            return;

        isDragging = true;
        activeNode = node;
        offsetX = e.clientX - node.offsetLeft;
        offsetY = e.clientY - node.offsetTop;
        node.classList.replace("cursor-grab", "cursor-grabbing");
    });

    node.addEventListener("dblclick", () => {
        node.contentEditable = "true";
        oldName = node.textContent;
        node.focus();
    });

    node.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        console.log("Right-clicked!");

        if (linkNode == null)
            linkNode = node;
        else{
            g.addEdge(linkNode.textContent, node.textContent);
            linkNode = null;
        }

        g.printGraph();
    });

    node.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (!g.doesVertexExits(e.target.textContent)) {
                g.renameVertex(oldName, e.target.textContent);
                e.preventDefault();
                node.contentEditable = "false";
            }
            else {
                alert("That value exits.");
                node.textContent = oldName;
            }
        }
    });

    node.addEventListener("blur", () => {
        node.contentEditable = "false";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging)
            return;

        if (e.target != node)
            return;

        node.style.left = `${e.clientX - offsetX}px`;
        node.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        node.classList.replace("cursor-grabbing", "cursor-grab");
    });
}