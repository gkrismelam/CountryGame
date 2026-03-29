import React from "react";
import './App.css'
import Canvas from "./components/Canvas";
import flags from "./assets/CountryFlagsImages/index.ts"

function App(): React.JSX.Element {
  return (
    <div>
      <img src={flags.ad} alt=".__ flag" style={{ width: 400, height: 250 }} />
      <Canvas></Canvas>
    </div>
  )
}

export default App
