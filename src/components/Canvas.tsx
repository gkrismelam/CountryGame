import React, { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker.jsx"
import flags from "../assets/CountryFlagsImages";
import { compareImages } from "../utils/ComparePixels.ts";

function Canvas(): React.JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const refCanvasRef = useRef<HTMLCanvasElement>(null);

    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(1);
    const [isErasing, setIsErasing] = useState(false);
    const [history, setHistory] = useState<ImageData[]>([]);

    const [score, setScore] = useState<number | null>(null);
    const currentFlag = flags.ad;

    useEffect(() => {
        const canvas = refCanvasRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    
        const img = new Image();
        img.src = currentFlag;
    
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 400, 250);
        };
    }, [currentFlag]);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory((prev) => [...prev, snapshot]);

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
        ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    const stopDrawing = () => setDrawing(false);

    const undo = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
      
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
      
        setHistory((prev) => {
          if (prev.length === 0) return prev;
      
          const lastState = prev[prev.length - 1];
          ctx.putImageData(lastState, 0, 0);
      
          return prev.slice(0, -1);
        });
        console.log(history.length);
    };

    const handleSubmit = () => {
        const userCanvas = canvasRef.current;
        const refCanvas = refCanvasRef.current;
        if (!userCanvas || !refCanvas) return;
    
        const userCtx = userCanvas.getContext("2d");
        const refCtx = refCanvas.getContext("2d");
        if (!userCtx || !refCtx) return;
    
        const userData = userCtx.getImageData(0, 0, 400, 250);
        const refData = refCtx.getImageData(0, 0, 400, 250);
    
        const result = compareImages(userData, refData);
        setScore(result);
    };

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
        <canvas
        ref={refCanvasRef}
        width={400}
        height={250}
        style={{ display: "none" }}
        />
        <ColorPicker color={color} changeColor={setColor} brushSize={brushSize} changeBrushSize={setBrushSize} undo={undo} erasing={isErasing} changeErasing={setIsErasing}></ColorPicker>
        <button onClick={handleSubmit}>Submit Drawing</button>
        {score !== null && <h2>Score: {score}%</h2>}
      </div>
    )
}
  
export default Canvas
