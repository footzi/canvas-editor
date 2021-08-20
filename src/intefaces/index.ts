import { Canvas } from '../canvas';
import { Line } from '../Line';

enum DrawTypes {
  default = 'DEFAULT',
  line = 'LINE',
}

const WIDTH = 200;
const HEIGHT = 200;
const DPI = 2;

export class UI {
  lineButton: HTMLButtonElement | null = null;
  clearButton: HTMLButtonElement | null = null;
  moveButton: HTMLButtonElement | null = null;
  context: CanvasRenderingContext2D;
  mode: DrawTypes = DrawTypes.default;
  form: HTMLFormElement | null = null;
  line: Line;
  line2: Line;
  line3: Line | null;
  canvas: Canvas;
  mouseMoveHandler: (event: MouseEvent) => void;
  x: number = 0;
  y: number = 0;
  isMoved: boolean;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;

    this.context.canvas.width = WIDTH;
    this.context.canvas.height = HEIGHT;

    this.x = 0;
    this.y = 0;

    this.isMoved = false;

    this.context.strokeStyle = 'white';

    this.canvas = new Canvas(this.context);

    this.line = new Line(this.context, this.canvas);
    this.line2 = new Line(this.context, this.canvas);
    this.line3 = null;

    this.line2.draw(0, 0, 200, 200);

    this.lineButton = document.querySelector('#line-button');
    this.clearButton = document.querySelector('#clear-button');
    this.moveButton = document.querySelector('#move-button');
    this.form = document.querySelector('#form');

    this.lineButton?.addEventListener('click', () => this.drawLine());
    this.clearButton?.addEventListener('click', () => this.clear());
    this.moveButton?.addEventListener('click', () => this.move());

    this.mouseMoveHandler = this.mouseMove.bind(this);

    document.addEventListener('mousedown', this.mouseDown.bind(this));

    this.form?.addEventListener('submit', (event) => this.formSubmit(event));
  }

  formSubmit(event: Event) {
    event.preventDefault();

    if (this.form) {
      const formData = new FormData(this.form);

      const startX = Number(formData.get('startX'));
      const startY = Number(formData.get('startY'));
      const endX = Number(formData.get('endX'));
      const endY = Number(formData.get('endY'));

      this.line.draw(startX, startY, endX, endY);
    }
  }

  clear() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
  }

  move() {
    const startX = 10;
    const startY = 20;
    const endX = 50;
    const endY = 70;

    this.line.move(startX, startY, endX, endY);
  }

  mouseDown(event: MouseEvent) {
    if (this.isMoved) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      this.isMoved = false;

      return;
    }

    const { x, y } = event;

    this.x = x;
    this.y = y;

    this.line3 = new Line(this.context, this.canvas);
    this.line3.draw(x, y, x, y);

    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseMove(event: MouseEvent) {
    const { x, y } = event;

    this.line3?.move(this.x, this.y, x, y);
    this.isMoved = true;
  }

  drawLine() {
    this.lineButton?.classList.toggle('active');
  }
}
