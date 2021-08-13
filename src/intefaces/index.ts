enum DrawTypes {
    default = "DEFAULT",
    line = "LINE",
}


export class UI {
    lineButton: HTMLButtonElement | null = null;
    context: CanvasRenderingContext2D;
    mode: DrawTypes = DrawTypes.default;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;

        this.context.canvas.width = 200;
        this.context.canvas.height = 200;

        this.lineButton = document.querySelector("#line-button")

        this.lineButton?.addEventListener("click", () => this.drawLine())

        document.addEventListener("mousedown", (event) => this.mouseDown(event))
        //
        // document.addEventListener("mousemove", (event) => {
        //     this.mouseMove(event)
        // })
    }

    mouseDown(event: MouseEvent) {
        const {x, y, offsetX, offsetY, pageX, pageY} = event;

        this.context.beginPath();
        this.context.moveTo(x, y);

        document.addEventListener("mousemove", (event) => this.mouseMove(event))
        document.addEventListener("mouseup", (event) => this.mouseUp(event))
    }

    mouseMove(event: MouseEvent) {
        const {x, y } = event;

        this.context.lineTo(x, y);
        this.context.stroke();
    }

    mouseUp(event: MouseEvent) {
        document.removeEventListener("mousemove", this.mouseMove);
    }


    drawLine() {
        this.lineButton?.classList.toggle('active');
    }


}

class DrawLine {

}