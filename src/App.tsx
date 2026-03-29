import React from "react";
import './App.css'
import Canvas from "./components/Canvas";

function App(): React.JSX.Element {
  return (
    <div className="app-container">
      <div className="canvas-card">
        <Canvas />
      </div>
    </div>
  )
}

export default App
