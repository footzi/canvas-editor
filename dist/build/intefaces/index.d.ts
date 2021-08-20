import { Canvas } from '../canvas';
import { Line } from '../Line';
declare enum DrawTypes {
    default = "DEFAULT",
    line = "LINE"
}
export declare class UI {
    lineButton: HTMLButtonElement | null;
    clearButton: HTMLButtonElement | null;
    moveButton: HTMLButtonElement | null;
    context: CanvasRenderingContext2D;
    mode: DrawTypes;
    form: HTMLFormElement | null;
    line: Line;
    line2: Line;
    line3: Line | null;
    canvas: Canvas;
    mouseMoveHandler: (event: MouseEvent) => void;
    x: number;
    y: number;
    isMoved: boolean;
    constructor(context: CanvasRenderingContext2D);
    formSubmit(event: Event): void;
    clear(): void;
    move(): void;
    mouseDown(event: MouseEvent): void;
    mouseMove(event: MouseEvent): void;
    drawLine(): void;
}
export {};
