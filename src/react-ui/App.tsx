import './index.css';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Canvas } from '../canvas';
import { Line, LineController } from '../Line';

// CanvasContext

const WIDTH = 500;
const HEIGHT = 300;

const useCanvas = (canvasRef: RefObject<HTMLCanvasElement>): Canvas | null => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new Canvas({
        root: canvasRef.current,
        width: WIDTH,
        height: HEIGHT,
      });

      setCanvas(canvas);
    }
  }, [canvasRef]);

  return canvas;
};

const useCanvasLine = (canvas: Canvas | null, isActive: boolean) => {
  useEffect(() => {
    const controller = canvas ? new LineController(canvas) : null;

    if (canvas) {
      const line = new Line(canvas);
      line.draw(50, 30, 50, 100);
      // line.draw(50, 30, 90, 100);
    }

    if (isActive) {
      controller?.init();
    }

    if (!isActive) {
      controller?.destroy();
    }

    return () => controller?.destroy();
  }, [canvas, isActive]);
};

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useCanvas(canvasRef);

  const [isLine, setIsLine] = useState(false);

  const onClickLine = () => {
    setIsLine(!isLine);
  };

  useCanvasLine(canvas, isLine);

  return (
    <div>
      <div className="controls">
        <button onClick={onClickLine} className={isLine ? 'is-active' : undefined}>
          Line
        </button>
      </div>

      <canvas ref={canvasRef} className="canvas" style={{ width: WIDTH, height: HEIGHT }} />
    </div>
  );
};
