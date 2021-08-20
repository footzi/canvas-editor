import { Canvas, CanvasContext, CanvasRoot } from './canvas';

export class LineController {
  canvas: Canvas;
  root: CanvasRoot;
  context: CanvasContext;
  line: Line;
  mouseMoveHandler: (event: MouseEvent) => void;
  mouseDownHandler: (event: MouseEvent) => void;
  x = 0;
  y = 0;
  isMoved = false;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.root = canvas.getRoot();
    this.context = canvas.getContext();

    this.mouseDownHandler = this.mouseDown.bind(this);
    this.mouseMoveHandler = this.mouseMove.bind(this);
  }

  public init(): void {
    this.root.addEventListener('mousedown', this.mouseDownHandler);
  }

  public destroy(): void {
    this.root.removeEventListener('mousedown', this.mouseDownHandler);
    this.root.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  // use only requestAnimationFrame
  private mouseDown(event: MouseEvent): void {
    if (this.isMoved) {
      this.root.removeEventListener('mousemove', this.mouseMoveHandler);

      this.isMoved = false;

      return;
    }

    const { offsetX, offsetY } = event;

    this.x = offsetX;
    this.y = offsetY;

    this.line = new Line(this.canvas);
    this.line.draw(this.x, this.y, this.x, this.y);

    this.root.addEventListener('mousemove', this.mouseMoveHandler);
  }

  private mouseMove(event: MouseEvent): void {
    const { offsetX, offsetY } = event;

    this.line.move(this.x, this.y, offsetX, offsetY);
    this.isMoved = true;
  }
}

export class Line {
  id: number;
  context: CanvasContext;
  canvas: Canvas;
  rectCoords = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext();
    this.id = this.generateId();

    this.context.strokeStyle = 'white';
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000000);
  }

  public draw(startX: number, startY: number, endX: number, endY: number): void {
    this.context.beginPath();
    this.context.moveTo(startX, startY);

    this.context.lineTo(endX, endY);
    this.context.stroke();

    this.canvas.addLineCoords(this.id, startX, startY, endX, endY);
  }

  public remove(): void {
    this.canvas.removeLine(this.id);
    this.canvas.repaintAll();
  }

  public move(startX: number, startY: number, endX: number, endY: number): void {
    this.remove();

    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.stroke();

    this.canvas.addLineCoords(this.id, startX, startY, endX, endY);
  }
}
