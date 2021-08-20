import { Canvas, CanvasContext, CanvasRoot } from './canvas';
export declare class LineController {
    canvas: Canvas;
    root: CanvasRoot;
    context: CanvasContext;
    line: Line;
    mouseMoveHandler: (event: MouseEvent) => void;
    mouseDownHandler: (event: MouseEvent) => void;
    x: number;
    y: number;
    isMoved: boolean;
    constructor(canvas: Canvas);
    init(): void;
    destroy(): void;
    private mouseDown;
    private mouseMove;
}
export declare class Line {
    id: number;
    context: CanvasContext;
    canvas: Canvas;
    rectCoords: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    constructor(canvas: Canvas);
    private generateId;
    draw(startX: number, startY: number, endX: number, endY: number): void;
    remove(): void;
    move(startX: number, startY: number, endX: number, endY: number): void;
}
