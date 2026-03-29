import React, { useRef, useState } from "react";
import ColorPicker from "./ColorPicker.jsx"

function Canvas(): React.JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState("#0000000");
    const [brushSize, setBrushSize] = useState(1);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        setDrawing(true);
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    const draw = (e: React.MouseEvent) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    const stopDrawing = () => setDrawing(false);

    return (
      <div>
        <canvas 
        ref={canvasRef}
        width={400} 
        height={250} 
        style={{ border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        />
        <ColorPicker color={color} changeColor={setColor} brushSize={brushSize} changeBrushSize={setBrushSize}></ColorPicker>
      </div>
    )
}
  
  export default Canvas
  