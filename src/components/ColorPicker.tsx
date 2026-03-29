import React from "react";

interface ColorPickerProps {
    color: string;
    changeColor: (newColor: string) => void;
    brushSize: number;
    changeBrushSize: (newBrushSize: number) => void;
}

function ColorPicker({color, changeColor, brushSize, changeBrushSize}: ColorPickerProps): React.JSX.Element {
    return (
        <div className="color-picker-container">
            <div className="color-display" style={{backgroundColor: color}}>
                <p>Selected Color: {color}</p>
            </div>
            <label>Select a color:</label>
            <input type="color" value={color} onChange={(e) => changeColor(e.target.value)}/>
            <input type="range" min="1" max="20" step="1" value={brushSize} onChange={(e) => changeBrushSize(Number(e.target.value))}/>
        </div>
    )
} 

export default ColorPicker;