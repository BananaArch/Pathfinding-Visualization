"use strict";

const hexContainer = document.getElementById("hexContainer");
DragToScroll.apply(hexContainer);

const grid = new Grid(25, 25);
WallDrawer.apply(grid);

grid.getValue(1, 1).setColor(Node.COLORS.START);
grid.getValue(23, 23).setColor(Node.COLORS.END);

let computingAStar = false;

function computeAStar() {
    if (computingAStar) return;
    computingAStar = true;
    search(grid, grid.getValue(1, 1), grid.getValue(23, 23));
}