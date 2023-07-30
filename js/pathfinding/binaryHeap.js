"use strict";

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
            const currentNode = this.values[currentIndex];
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            const parentNode = this.values[parentIndex];

            if (currentNode.hasPriorityOver(parentNode)) {
                this.values[parentIndex] = currentNode;
                this.values[currentIndex] = parentNode;
                currentIndex = parentIndex;
            } else break;
        }
    }

    dequeue() {
        if (this.values.length === 0) return null;
        if (this.values.length === 1) return this.values.pop();
        const min = this.values[0];
        const finalNode = this.values.pop();
        this.values[0] = finalNode;
    
        let currentIndex = 0;
        let currentNode = this.values[currentIndex];

        while (true) {

            let newIndex = null;
            
            let leftChildIndex = 2 * currentIndex + 1;
            let rightChildIndex = 2 * currentIndex + 2;
            let leftChildNode, rightChildNode;
            
            if (leftChildIndex < this.values.length) {

                leftChildNode = this.values[leftChildIndex];
                if (leftChildNode.hasPriorityOver(currentNode)) 
                    newIndex = leftChildIndex;            
            }

            if (rightChildIndex < this.values.length) {

                rightChildNode = this.values[rightChildIndex];
                if (
                    (newIndex === null && rightChildNode.hasPriorityOver(currentNode)) ||
                    (newIndex !== null && rightChildNode.hasPriorityOver(leftChildNode))
                )
                    newIndex = rightChildIndex;
            }
    
            if (newIndex === null) break;

            this.values[currentIndex] = this.values[newIndex];
            this.values[newIndex] = currentNode;
            currentIndex = newIndex;
        }
    
        return min;
    }    

    isEmpty() {
        return this.values.length === 0;
    }

    includes(node) {
        return this.values.includes(node);
    }

    peek() {
        if (!this.isEmpty())
            return this.values[0];
        else
            return null;
    }

    size() {
        return this.values.length;
    }

}