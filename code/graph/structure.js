export class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    updatedGraph(graph)
    {
        this.adjacencyList = graph.adjacencyList;
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (!vertex1 || !vertex2)
            return;

        if (this.adjacencyList[vertex1].includes(vertex2) || this.adjacencyList[vertex2].includes(vertex1))
            return;

        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        );
    }

    removeVertex(vertex) {
        if (!this.doesVertexExits(vertex))
            return;

        while (this.adjacencyList[vertex]) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }

    renameVertex(oldName, newName) {
        if (!this.doesVertexExits([oldName])) {
            console.log(`${oldName} does not exist`);
            return;
        }

        this.adjacencyList[newName] = this.adjacencyList[oldName];

        for (let vertex in this.adjacencyList) {
            this.adjacencyList[vertex] = this.adjacencyList[vertex].map(v =>
                v === oldName ? newName : v
            );
        }

        delete this.adjacencyList[oldName];
    }

    getVertexEdges(vertex) {
        if (!this.adjacencyList[vertex]) return [];
        return [...this.adjacencyList[vertex]];
    }

    doesVertexExits(name) {
        return name in this.adjacencyList;
    }

    getEdges() {
        const edges = [];
        const seen = new Set();

        for (let vertex in this.adjacencyList) {
            for (let neighbor of this.adjacencyList[vertex]) {
                const edgeKey = [vertex, neighbor].sort().join("-");
                if (!seen.has(edgeKey)) {
                    seen.add(edgeKey);
                    edges.push([vertex, neighbor]);
                }
            }
        }

        return edges;
    }

    printGraph() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, "->", this.adjacencyList[vertex]);
        }
    }
}