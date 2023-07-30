"use strict";

// TODO: make it inheritable so i can do other stuff (other than A*)

class Node {

    static COLORS = {
        WALL: "#39393A",
        START: "#08A045",
        END: "#96031A",
        PASSED: "#FF9585",
        NEIGHBOR: "#DDF976",
        PATH : "#503C02"
    }

    constructor(nodeDiv, r, q, isWall = false) {
        this.nodeDiv = nodeDiv;
        this.r = r;
        this.q = q;
        this.isWall = isWall;
        this.f = Infinity; // h + g
        this.g = Infinity; // Distance from origin
        this.h = 0; // Heuristic Cost
    }

    /*
    * https://www.redblobgames.com/grids/hexagons/
    */
    static _evenROffsetToAxial(node) {
        return { 
            rAxial: node.r - Math.floor(node.q / 2), 
            qAxial: node.q
        };
    }


    // The traditional formulas for euclidian and manhtattan are not admissable due to it being in offset coordinates (https://en.wikipedia.org/wiki/Admissible_heuristic)
    calculateHeuristicCost(endNode) {

        const thisAxial = Node._evenROffsetToAxial(this);
        const endAxial = Node._evenROffsetToAxial(endNode);

        const dr = Math.abs(thisAxial.rAxial - endAxial.rAxial);
        const dq = Math.abs(thisAxial.qAxial - endAxial.qAxial);

        const heuristic = dq + Math.max(0, dr - Math.floor(dq / 2));

        this.h = heuristic;

        this.calculateTotalCost();

        return heuristic;

    }

    calculateTotalCost() {
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

    toggleWall() {
        this.isWall = !this.isWall;
        if (this.isWall) {
            this.setColor(Node.COLORS.WALL);
        } else {
            this.setColor(this.originalColor);
        }
    }

    setColor(hexId, originalColor = false) {
        if (originalColor) this.originalColor = hexId;
        this.nodeDiv.style.setProperty("--hexagon-background", hexId);
    }

    resetColor() {
        setColor(this.originalColor);
    }
}