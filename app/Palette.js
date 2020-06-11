import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {  rgbArrayToRgb } from "./utils";

import "./palette.css";

// Check if a color item passes the RGB like array validator
// valid: [r, g, b] where {r, g, b} are in the range of [0, 255]
const RgbType = PropTypes.arrayOf((propValue, key) => {
  if (key > 2 || !Array.isArray(propValue)) {
    return new Error(
        'Invalid prop colors RGB supplied to' +
        'Palette. Validation failed.'
    );
  }

  if (propValue[key] > 255 || propValue[key] < 0) {
    return new Error(
        'Invalid prop colors RGB supplied to' +
        'Palette. Validation failed.'
    );
  }
});

const COPIED_TO_CLIPBOARD_MESSAGE_DELAY = 2000;

const Palette = ({ colors }) => {
  const [wasCopied, setWasCopied] = useState(false);
  const handleMouseOver = useCallback(
    (color) => () => {
      document.body.style.backgroundColor = color;
    },
    []
  );

  useEffect(() => {
    if (wasCopied) {
      setTimeout(() => {
        setWasCopied(false);
      }, COPIED_TO_CLIPBOARD_MESSAGE_DELAY);
    }
  }, [wasCopied]);

  const handleClick = useCallback((color) => () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(color);
      setWasCopied(color);
    }
  });

  return (
    <div className="palette-container">
      {colors.map((color) => (
        <span
          className="palette"
          key={`palette-${color}`}
          onMouseOver={handleMouseOver(rgbArrayToRgb(color))}
          onClick={handleClick(rgbArrayToRgb(color))}
          style={{ backgroundColor: rgbArrayToRgb(color) }}
        >
          {rgbArrayToRgb(color) === wasCopied && <span className="copied-message">copied</span>}
        </span>
      ))}
    </div>
  );
};

Palette.propTypes = {
  colors: PropTypes.arrayOf(RgbType),
};

export default Palette;
