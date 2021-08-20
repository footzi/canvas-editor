export enum FigureTypes {
  Line = 'LINE',
}

export interface Figure {
  id: number;
  coords: [number, number, number, number];
  type: FigureTypes;
}

export interface CanvasSettings {
  root: HTMLCanvasElement;
  width: number;
  height: number;
  dpi?: number;
}

export type CanvasRoot = HTMLCanvasElement;
export type CanvasContext = CanvasRenderingContext2D;

export class Canvas {
  private readonly root: CanvasRoot;
  private figures: Figure[] = [];
  private readonly context: CanvasContext;
  private readonly width: number;
  private readonly height: number;

  constructor(settings: CanvasSettings) {
    this.root = settings.root;
    this.context = this.root.getContext('2d');
    this.width = settings.width;
    this.height = settings.height;

    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;

    this.onTest();
  }

  // use only requestAnimationFrame
  public onTest() {
    const padding = {
      top: 5,
      right: 10,
      bottom: 5,
      left: 10,
    };

    const lineWidth = 1;

    this.root.addEventListener('mousemove', (event: MouseEvent) => {
      const { offsetX, offsetY } = event;

      const { coords } = this.figures[0];

      // only for paint borders in canvas
      // const rect = {
      //   x: coords[0] - padding.left,
      //   y: coords[1] - padding.top,
      //   width: coords[2] - coords[0] + padding.left + padding.right,
      //   height: coords[3] - coords[1] + padding.bottom + padding.top,
      // };

      this.context.strokeStyle = 'yellow';

      this.context.beginPath();
      this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);

      if (offsetX >= rect.x && offsetX <= rect.x + rect.width && offsetY >= rect.y && offsetY <= rect.y + rect.height) {
        console.log('target');
      }

      console.log(coords, 'coords');
      console.log(rect);
      // console.log(offsetX);
      // console.log(offsetY);
    });
  }

  public addLineCoords(id: number, startX: number, startY: number, endX: number, endY: number): void {
    this.figures.push({
      id,
      coords: [startX, startY, endX, endY],
      type: FigureTypes.Line,
    });
  }

  public removeLine(id: number): void {
    this.figures = this.figures.filter((figure) => figure.id !== id);
  }

  public repaintLine(startX: number, startY: number, endX: number, endY: number): void {
    this.context.beginPath();
    this.context.moveTo(startX, startY);

    this.context.lineTo(endX, endY);
    this.context.stroke();
  }

  public repaintAll(): void {
    this.context.clearRect(0, 0, this.width, this.height);

    this.figures.forEach((figure) => {
      this.repaintLine(figure.coords[0], figure.coords[1], figure.coords[2], figure.coords[3]);
    });
  }

  public getRoot(): CanvasRoot {
    return this.root;
  }

  public getContext(): CanvasContext {
    return this.context;
  }
}
