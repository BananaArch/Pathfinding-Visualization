"use strict";

const hexContainer = document.getElementById("hex-container");
let pos = { top: 0, left: 0, x: 0, y: 0 };

generateHexGrid(4, 4);

hexContainer.addEventListener("mousedown", mouseDownHandler);

// https://htmldom.dev/drag-to-scroll/
function mouseDownHandler(e) {
    console.log("down");
    pos = {
        left: hexContainer.scrollLeft,
        top: hexContainer.scrollTop,
        x: e.clientX,
        y: e.clientY,
    };
    hexContainer.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    hexContainer.style.cursor = "grabbing";
    hexContainer.style.userSelect = "none";
}

function mouseMoveHandler(e) {

    // makes it stop if leaves hexContainer
    if (!hexContainer.contains(e.target)) mouseUpHandler();

    console.log("moving");
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    hexContainer.scrollTop = pos.top - dy;
    hexContainer.scrollLeft = pos.left - dx;
}

function mouseUpHandler() {
    hexContainer.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    hexContainer.style.cursor = "default";
    hexContainer.style.removeProperty("user-select");
}

function generateHexGrid(rows, cols) {
    const hexGrid = document.getElementById("hexGrid");

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const hexagon = document.createElement("div");
            hexagon.classList.add("hexagon");

            const xPixel = (row % 2 === 0 ? col * 59 + 30 : col * 59) + 10;
            const yPixel = row * 54 + 20;

            hexagon.style.left = `${xPixel}px`;
            hexagon.style.top = `${yPixel}px`;

            hexGrid.appendChild(hexagon);
        }
    }
}
