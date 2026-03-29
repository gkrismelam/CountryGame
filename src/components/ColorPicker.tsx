import React from "react";
import "./ColorPicker.css";

interface ColorPickerProps {
    color: string;
    changeColor: (newColor: string) => void;
    brushSize: number;
    changeBrushSize: (newBrushSize: number) => void;
    undo: () => void;
    erasing: boolean;
    changeErasing: (newErasing: boolean) => void;
}

function ColorPicker({color, changeColor, brushSize, changeBrushSize, undo, erasing, changeErasing}: ColorPickerProps): React.JSX.Element {
    return (
        <div className="color-picker-container">
            <div className="color-display" style={{backgroundColor: color}}>
                <p>Selected Color: {color}</p>
            </div>

            <div className="color-actions">
                <button onClick={() => undo()}>Undo</button>
                <button onClick={() => changeErasing(!erasing)}> {erasing ? "Draw Mode" : "Eraser"} </button>
            </div>

            <div className="color-selection">
                <label htmlFor="color-picker">Select a color:</label>
                <input type="color" value={color} onChange={(e) => changeColor(e.target.value)}/>
            </div>

            <div className="brush-selection">
                <label htmlFor="brush-size" className="brush-label">Select a brush size:</label>
                <div className="brush-slider-row">
                    <input type="range" className="brush-slider" min="1" max="50" step="1" value={brushSize} onChange={(e) => changeBrushSize(Number(e.target.value))}/>
                    <div
                        className="brush-indicator"
                        style={{
                            width: brushSize,
                            height: brushSize,
                            backgroundColor: color,
                        }}
                    />
                </div>
            </div>
        </div>
    )
} 

export default ColorPicker;