'use strict';

var DrawTypes;
(function (DrawTypes) {
    DrawTypes["default"] = "DEFAULT";
    DrawTypes["line"] = "LINE";
})(DrawTypes || (DrawTypes = {}));
class UI {
    constructor(context) {
        var _a;
        this.lineButton = null;
        this.mode = DrawTypes.default;
        this.context = context;
        this.context.canvas.width = 200;
        this.context.canvas.height = 200;
        this.lineButton = document.querySelector("#line-button");
        (_a = this.lineButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.drawLine());
        document.addEventListener("mousedown", (event) => this.mouseDown(event));
        //
        // document.addEventListener("mousemove", (event) => {
        //     this.mouseMove(event)
        // })
    }
    mouseDown(event) {
        const { x, y, offsetX, offsetY, pageX, pageY } = event;
        this.context.beginPath();
        this.context.moveTo(x, y);
        document.addEventListener("mousemove", (event) => this.mouseMove(event));
        document.addEventListener("mouseup", (event) => this.mouseUp(event));
    }
    mouseMove(event) {
        const { x, y } = event;
        this.context.lineTo(x, y);
        this.context.stroke();
    }
    mouseUp(event) {
        document.removeEventListener("mousemove", this.mouseMove);
    }
    drawLine() {
        var _a;
        (_a = this.lineButton) === null || _a === void 0 ? void 0 : _a.classList.toggle('active');
    }
}

const canvas = document.querySelector('#canvas');
const context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
if (context) {
    new UI(context);
}
