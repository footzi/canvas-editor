export declare enum FigureTypes {
    Line = "LINE"
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
export declare type CanvasRoot = HTMLCanvasElement;
export declare type CanvasContext = CanvasRenderingContext2D;
export declare class Canvas {
    private readonly root;
    private figures;
    private readonly context;
    private readonly width;
    private readonly height;
    constructor(settings: CanvasSettings);
    onTest(): void;
    addLineCoords(id: number, startX: number, startY: number, endX: number, endY: number): void;
    removeLine(id: number): void;
    repaintLine(startX: number, startY: number, endX: number, endY: number): void;
    repaintAll(): void;
    getRoot(): CanvasRoot;
    getContext(): CanvasContext;
}
