import React, { useCallback, useState } from "react";
import { distil } from "distil";
import DropArea from "./DropArea";
import Palette from "./Palette";
import { rgbArrayToRgb } from "./utils";

import "./app.css";

const App = () => {
  const [colors, setColors] = useState([]);
  const handleImageReady = useCallback((buffer) => {
    setColors(distil(new Uint8Array(buffer)).map(rgbArrayToRgb));
  }, []);

  return (
    <div className="app">
      <DropArea onFile={handleImageReady} />
      <Palette colors={colors} />
    </div>
  );
};

export default App;
