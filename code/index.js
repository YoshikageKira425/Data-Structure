import { Graph } from "./structure.js";

const g = new Graph();
const dragBox = document.getElementById("dragBox");

const nodeContainer = document.getElementById("node-container");
const lineContainer = document.getElementById("line-container");

addFuctionToNode(dragBox);

let isDragging = false;
let offsetX, offsetY;
let activeNode = null;
let oldName;
let linkNode;
let line;

document.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("node"))
        return;

    const newElement = document.createElement("div");
    newElement.className = "node select-none w-20 h-20 bg-blue-600 border-2 border-blue-800 text-white flex items-center justify-center rounded-full shadow-lg cursor-grab absolute";
    newElement.textContent = Math.random();

    newElement.style.left = `${e.clientX - 40}px`;
    newElement.style.top = `${e.clientY - 40}px`;

    nodeContainer.appendChild(newElement);
    addFuctionToNode(newElement);
});

document.addEventListener("contextmenu", (e) => {
    if (!e.target.classList.contains("node")){
        linkNode = null;

        if (line)
            line.remove();
        line = null;
    }
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

        if (linkNode == null) {
            linkNode = node;

            line = document.createElement("div");
            line.className = "absolute select-none h-0.5 bg-red-500 transform-gpu origin-left";
            lineContainer.appendChild(line);

            connectLineToMouse(node, line);
        }
        else {
            removeConnectLineToMouse();
            connectElements(linkNode, node, line);
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

function connectElements(el1, el2, lineEl) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    const center1X = rect1.left + rect1.width / 2;
    const center1Y = rect1.top + rect1.height / 2;
    const center2X = rect2.left + rect2.width / 2;
    const center2Y = rect2.top + rect2.height / 2;

    const dx = center2X - center1X;
    const dy = center2Y - center1Y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    lineEl.style.width = `${distance}px`;
    lineEl.style.transform = `rotate(${angle}deg)`;
    lineEl.style.left = `${center1X}px`;
    lineEl.style.top = `${center1Y}px`;
}

let fixedX, fixedY, lineEl;

function mouseMoveHandler(event) {
    const mouseX = event.clientX + 3;
    const mouseY = event.clientY + 3;

    const dx = mouseX - fixedX;
    const dy = mouseY - fixedY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    lineEl.style.width = `${distance}px`;
    lineEl.style.transform = `rotate(${angle}deg)`;
    lineEl.style.left = `${fixedX}px`;
    lineEl.style.top = `${fixedY}px`;
}

function connectLineToMouse(element, line) {
    const fixedRect = element.getBoundingClientRect();
    fixedX = fixedRect.left + fixedRect.width / 2;
    fixedY = fixedRect.top + fixedRect.height / 2;
    lineEl = line;

    document.addEventListener('mousemove', mouseMoveHandler);
}

function removeConnectLineToMouse() {
    document.removeEventListener('mousemove', mouseMoveHandler);
}
