import React, { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker.jsx"
import flags from "../assets/CountryFlagsImages";
import { compareImages } from "../utils/ComparePixels";

function Canvas(): React.JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const refCanvasRef = useRef<HTMLCanvasElement>(null);

    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(1);
    const [isErasing, setIsErasing] = useState(false);
    const [_history, setHistory] = useState<ImageData[]>([]);

    const [score, setScore] = useState<number | null>(null);
    const [currentFlagKey, setCurrentFlagKey] = useState<string>("");

    const pickRandomFlag = () => {
        const keys = Object.keys(flags);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        setCurrentFlagKey(randomKey);
    };

    useEffect(() => {
        if (!currentFlagKey) return;

        const refCanvas = refCanvasRef.current;
        const userCanvas = canvasRef.current;
        if (!refCanvas || !userCanvas) return;
      
        const refCtx = refCanvas.getContext("2d");
        const userCtx = userCanvas.getContext("2d");
        if (!refCtx || !userCtx) return;
      
        const img = new Image();
        img.src = flags[currentFlagKey];
    
        img.onload = () => {
            refCtx.clearRect(0, 0, 400, 250);
            userCtx.clearRect(0, 0, 400, 250);
            setHistory([]);
            setScore(null);
            refCtx.drawImage(img, 0, 0, 400, 250);
        };
    }, [currentFlagKey]);

    useEffect(() => {
        requestAnimationFrame(() => pickRandomFlag());
    }, []);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory((prev) => [...prev, snapshot]);

        setDrawing(true);

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
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
        console.log(_history);
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
        <img src={flags[currentFlagKey]} alt=".__ flag" style={{ width: 400, height: 250 }} />
        <canvas 
        ref={canvasRef}
        width={400} 
        height={250} 
        style={{ border: '3px solid black', cursor: 'crosshair' }}
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
        <p>Current Flag: {currentFlagKey}</p>
        <button onClick={pickRandomFlag}>Next Flag</button>
      </div>
    )
}
  
export default Canvas
