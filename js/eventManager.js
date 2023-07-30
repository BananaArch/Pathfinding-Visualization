"use strict";

/*
https://www.youtube.com/watch?v=A95mIE2HdcY&t=214s&ab_channel=dcode
*/



class WallDrawer {

    // Singleton Design Pattern
    constructor(grid) {
        if (WallDrawer.instance == null) {
            // Add hexagonClickHandler for all hexagonDivs
            grid.forEach((hexagonNode) => hexagonNode.nodeDiv.addEventListener("click", (e) => this._hexagonClickHandler(e)));
            this.grid = grid;
            WallDrawer.instance = this;
        }
            return WallDrawer.instance;
        
    }

    // make it so cant draw on start / end
    _hexagonClickHandler(e) {
        const nodeDiv = e.target;
        const row = parseInt(nodeDiv.dataset.row, 10);
        const col = parseInt(nodeDiv.dataset.col, 10);

        const clickedNode = this.grid.getValue(row, col);
        clickedNode.toggleWall();
    }

    static apply(grid) {
        new WallDrawer(grid);
    }
    
}

class DragToScroll {
    constructor(target) {
        this.target = target;
        this.pos = { top: 0, left: 0, x: 0, y: 0 };

        this._mouseDownHandler = this._mouseDownHandler.bind(this);
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
        this._mouseUpHandler = this._mouseUpHandler.bind(this);

        this.target.addEventListener("mousedown", this._mouseDownHandler);
        this.target.addEventListener("touchstart", this._mouseDownHandler);
        document.addEventListener("contextmenu", this._contextMenuHandler);
    }

    _mouseDownHandler(e) {
        if (e.which !== 3) {
            return;
        }

        this.pos = {
            left: this.target.scrollLeft,
            top: this.target.scrollTop,
            x: e.clientX || e.touches[0].clientX,
            y: e.clientY || e.touches[0].clientY,
        };

        this.target.addEventListener("mousemove", this._mouseMoveHandler);
        this.target.addEventListener("touchmove", this._mouseMoveHandler);
        document.addEventListener("mouseup", this._mouseUpHandler);
        document.addEventListener("touchend", this._mouseUpHandler);

        this.target.style.cursor = "grabbing";
        this.target.style.userSelect = "none";
    }

    _mouseMoveHandler(e) {
        if (!this.target.contains(e.target)) this._mouseUpHandler();

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        const dx = clientX - this.pos.x;
        const dy = clientY - this.pos.y;

        this.target.scrollTop = this.pos.top - dy;
        this.target.scrollLeft = this.pos.left - dx;
    }

    _mouseUpHandler() {
        this.target.removeEventListener("mousemove", this._mouseMoveHandler);
        this.target.removeEventListener("touchmove", this._mouseMoveHandler);
        document.removeEventListener("mouseup", this._mouseUpHandler);
        document.removeEventListener("touchend", this._mouseUpHandler);

        this.target.style.cursor = "default";
        this.target.style.removeProperty("user-select");
    }

    _contextMenuHandler(e) {
        e.preventDefault();
    }

    static apply(target) {
        new DragToScroll(target); 
    }
}

// class ClickAndHold {
//     constructor(target, callback) {
//         this.target = target;
//         this.callback = callback;
//         this.isHeld = false;
//         this.activeHoldTimeoutId = null;

//         this._mouseDownHandler = this._mouseDownHandler.bind(this);
//         this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
//         this._mouseUpHandler = this._mouseUpHandler.bind(this);

//         this.target.addEventListener("mousedown", this._mouseDownHandler);
//         this.target.addEventListener("touchstart", this._mouseDownHandler);
//     }

//     _onHoldEnd() {
//         this.isHeld = false;
//         clearTimeout(this.activeHoldTimeoutId);
//     }

//     _mouseDownHandler(e) {
//         if (e.which !== 3) {
//             return;
//         }

//         this.isHeld = true;

//         this.activeHoldTimeoutId = setTimeout(() => {
//             if (this.isHeld) {
//                 this.target.addEventListener("mousemove", this._mouseMoveHandler);
//                 this.target.addEventListener("touchmove", this._mouseMoveHandler);
//                 document.addEventListener("mouseup", this._mouseUpHandler);
//                 document.addEventListener("touchend", this._mouseUpHandler);

//                 this.callback();
//             }
//         }, 1000)

//     }

//     _mouseMoveHandler(e) {
//         if (!this.target.contains(e.target)) this._mouseUpHandler();

//         const clientX = e.clientX || e.touches[0].clientX;
//         const clientY = e.clientY || e.touches[0].clientY;
//         const dx = clientX - this.pos.x;
//         const dy = clientY - this.pos.y;

//         this.target.scrollTop = this.pos.top - dy;
//         this.target.scrollLeft = this.pos.left - dx;
//     }

//     _mouseUpHandler() {
//         this.target.removeEventListener("mousemove", this._mouseMoveHandler);
//         this.target.removeEventListener("touchmove", this._mouseMoveHandler);
//         document.removeEventListener("mouseup", this._mouseUpHandler);
//         document.removeEventListener("touchend", this._mouseUpHandler);

//         this.target.style.cursor = "default";
//         this.target.style.removeProperty("user-select");
//     }

//     _contextMenuHandler(e) {
//         e.preventDefault();
//     }
    
// }