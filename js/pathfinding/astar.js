"use strict";

function reconstructPath(cameFrom, currentNode) {
    let totalPath = [currentNode];
    while (cameFrom.has(currentNode)) {
        currentNode.setColor(Node.COLORS.PATH);
        currentNode = cameFrom.get(currentNode);
        totalPath.unshift(currentNode);
    }
    return totalPath;
}

async function search(grid, start, end) {
    if (!grid.isValidPosition(start) || !grid.isValidPosition(end)) {
        console.error("The start or end value is out of bounds");
        throw new Error("Node is out of bounds");
    }

    const openSet = new BinaryHeap();
    const cameFrom = new Map();
    cameFrom.set(start, null);

    start.g = 0;
    start.f = start.h;

    openSet.enqueue(start);

    while (!openSet.isEmpty()) {
        const currentNode = openSet.dequeue();
        console.log(currentNode.f);
        if (currentNode === end) return reconstructPath(cameFrom, currentNode);

        currentNode.setColor(Node.COLORS.PASSED);

        const neighbors = grid.getNeighbors(currentNode);

        for (const neighborNode of neighbors) {

            if (neighborNode.isWall || cameFrom.has(neighborNode)) continue;
            
            neighborNode.setColor(Node.COLORS.NEIGHBOR);

            const tentativeG = currentNode.g + 1;

            if (!openSet.includes(neighborNode)) {
                neighborNode.g = tentativeG;
                neighborNode.calculateHeuristicCost(end);

                console.log(
                    `Checking Node @ (${neighborNode.r}, ${neighborNode.q})
                    isWall = ${neighborNode.isWall}
                    F-Cost = ${neighborNode.f}
                    G-cost = ${neighborNode.g}
                    H-cost = ${neighborNode.h}`
                );
                console.log(
                    `The first 3 values in the openSet is: 
                    ${openSet.values[0]?.f}, ${openSet.values[1]?.f}, ${openSet.values[2]?.f}`
                );
                console.log(
                    `The openset currently consists of:
                    ${openSet.values.map(node => node.f)}`
                );

                // neighborNode.nodeDiv.textContent = neighborNode.f;

                cameFrom.set(neighborNode, currentNode);
                openSet.enqueue(neighborNode);

            } else if (tentativeG < neighborNode.g) {
                neighborNode.g = tentativeG;
                cameFrom.set(neighborNode, currentNode);
            }

            await delay(100);

        }
    }

    console.error("A* did not find a path");
    return null;

}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}