"use strict";

function search(grid, start, end) {
    let openSet = new BinaryHeap();
}

class Node {
    constructor(x, y, isWall = false) {
        this.x = x;
        this.y = y;
        this.isWall = isWall;
        this.f = 0; // h + g
        this.g = Infinity; // Distance from origin
        this.h = 0; // Heuristic Cost
    }

    // must be admissable (https://en.wikipedia.org/wiki/Admissible_heuristic)
    _calculateHeuristicCost(endNode, manhattan = true) {

        const dx = Math.abs(endNode.x - this.x);
        const dy = Math.abs(endNode.y - this.y);
        
        if (manhattan) {
            // Manhattan Distance
            this.h = dx + dy;
        } else {
            // Euclidian Distance (not best b/c sqrt is expensive)
            this.h = Math.sqrt(dx**2 + dy**2);   
        }
        
        this._calculateTotalCost();
    }

    _calculateTotalCost() {
        this.f = this.g + this.h;
    }

    /**
     * Compares two nodes, returning the smallest f value. If there is a tie, it will return smallest h value.
     * @param  {Node}        node The node you are comparing with
     * @return {Boolean}     If this node has priority over the other node
     */
    hasPriorityOver(node) {
        if (this.f === node.f) {
            return this.h < node.h;    
        }
        return this.f < node.f;
    }
}

/*
Binary Heap w/ Priority Queue
https://www.digitalocean.com/community/tutorials/js-binary-heaps
*/
class BinaryHeap {
    constructor() {
        /*
        1D Array of Nodes
        */
        this.values = [];
    }

    enqueue(node) {
        this.values.push(node);
        let currentIndex = this.values.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            const currentNode = this.values[currentIndex];
            const parentNode = this.values[parentIndex];
            
            if (currentNode.hasPriorityOver(parentNode)) {
                this.values[parentIndex] = currentNode;
                this.values[currentIndex] = parentNode;
                currentIndex = parentIndex;
            } else break;
        }
    }

    dequeue() {
        const max = this.values[0];
        const finalNode = this.values.pop();
        this.values[0] = finalNode;
        let currentIndex = 0;
        let currentNode = this.values[currentIndex];

        while (true) {
            
            let newIndex = null;   
            
            const leftChild = {
                index: 2 * currentIndex + 1,
                node: this.values[2 * currentIndex + 1] // if out of bounds, it will be undefined
            };
            const rightChild = {
                index: 2 * currentIndex + 2,
                node: this.values[2 * currentIndex + 2] // if out of bounds it will be undefined
            };
            
            if (
                (leftChild.node !== undefined) &&
                (currentNode.hasPriorityOver(leftChild.node))
               ) newIndex = leftChild.index;
            if (
                (rightChild.node !== undefined &&
                    (newIndex === null && currentNode.hasPriorityOver(rightChild.node)) ||
                    (newIndex !== null && rightChild.node.hasPriorityOver(leftChild.node))
                )
            ) newIndex = rightChild.index;

            if (newIndex === null) break;

            this.values[currentIndex] = this.values[newIndex];
            this.values[newIndex] = currentNode;

            currentIndex = newIndex;
            
        }
        
        return max;
    }
    
}