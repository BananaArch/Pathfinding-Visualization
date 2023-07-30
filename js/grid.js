"use strict";

/*
https://www.redblobgames.com/grids/hexagons/
*/

/** 
TODO: make this inheritable s.t. i can have option for square or hexagon grid
*/

class Grid {

    // Singleton Design Pattern
    constructor(rows, cols) {
        if (Grid.instance == null) {
            this.grid = this._generateHexGrid(rows, cols);
            Grid.instance = this;
        }
        return Grid.instance;
    }

    setValue(row, col, value) {
        if (this.isValidPosition(row, col)) {
            this.grid[row][col] = value;
        } else {
            console.error(`Invalid position: (${row}, ${col}).`);
        }
    }

    isValidPosition(rowOrNode, col) {
        if (col === undefined) {
            const node = rowOrNode;
            return this.isValidPosition(node.r, node.q);
        } else {
            const row = rowOrNode;
            return row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[row].length;
        }
    }

    getValue(row, col) {
        if (this.isValidPosition(row, col)) {
            return this.grid[row][col];
        } else {
            console.error(`Invalid position: (${row}, ${col}).`);
            throw new Error("Grid out of bounds"); 
        }
    }

    getNeighbors(node) {

        /**
         * The grid should be in “even-r” horizontal layout
         */

        const evenRNeighborCoordinates = [
            { r: node.r,     q: node.q - 1 },
            { r: node.r,     q: node.q + 1 },
            { r: node.r - 1, q: node.q     },
            { r: node.r - 1, q: node.q + 1 },
            { r: node.r + 1, q: node.q + 1 },
            { r: node.r + 1, q: node.q     },
        ];
        const oddRNeighborCoordinates = [
            { r: node.r, q: node.q - 1     },
            { r: node.r, q: node.q + 1     },
            { r: node.r - 1, q: node.q - 1 },
            { r: node.r - 1, q: node.q     },
            { r: node.r + 1, q: node.q - 1 },
            { r: node.r + 1, q: node.q     }
        ];

        const neighborCoordinates = ((node.r % 2) === 0) ? evenRNeighborCoordinates : oddRNeighborCoordinates;
    
        const validNeighbors = neighborCoordinates.filter(({r, q}) => (this.isValidPosition(r, q)));
    
        const neighbors = validNeighbors.map(({r, q}) => this.grid[r][q]);
    
        return neighbors;
    }

    _generateHexGrid(rows, cols) {

        let gridArray = [];
        const hexGrid = document.getElementById("hexGrid");
    
        // to make it look pretty
        const colorScheme = this._getRandomColorScheme();
        const randomIntegerBetween1And4 = Math.floor(Math.random() * 4) + 1;
    
        for (let row = 0; row < rows; row++) {
    
            const gridArrayRow = [];
    
            for (let col = 0; col < cols; col++) {
                const hexagon = document.createElement("div");
                hexagon.classList.add("hexagon");
                hexagon.setAttribute("id", `node-${row}-${col}`);
                hexagon.dataset.row = row;
                hexagon.dataset.col = col;
    
                const pixelPosition = {
                    x: (row % 2 === 0 ? col * 54 + 27 : col * 54) + 10,
                    y: row * 47 + 20
                }; 
    
                hexagon.style.left = `${pixelPosition.x}px`;
                hexagon.style.top = `${pixelPosition.y}px`;

                hexGrid.appendChild(hexagon);
    
                const node = new Node(hexagon, row, col);

                // to give it a weird looking random pattern
                let hexagonColor;
                switch((randomIntegerBetween1And4 * (col + row)) % 5) {
                    case 0:
                        hexagonColor = colorScheme[0];
                        break;
                    case 1:
                        hexagonColor = colorScheme[1];
                        break;
                    default: 
                        hexagonColor = colorScheme[2];
                        break;
                } 

                node.setColor(hexagonColor, true)
                
                gridArrayRow.push(node);
            }
    
            gridArray.push(gridArrayRow);
        }

        return gridArray;
    }

    _getRandomColorScheme() {
        const possibleGridColorSchemes = {
            gray: ["#DDE0E3", "#E9EBED", "#F4F5F6"],
            yellow: ["#FBF1B1", "#FFF6C2", "#FDF8D8"],
            orange: ["#FAE8C6", "#FBECD0", "#FCF0D9"],
            pink: ["#FDE1E6", "#FDE6EA", "#FDECEF"],
            blue: ["#D4E2ED", "#E3ECF3", "#F1F5F9"],
            purple: ["#EEDCF6", "#F2E5F9", "#F7EFFB"]
        }
        const colorKeys = Object.keys(possibleGridColorSchemes);
        const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        return possibleGridColorSchemes[randomKey];
    }

    forEach(callback) {
        for(let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                callback(this.grid[i][j], i, j, this.grid);
            }
        }
    }
}