import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./palette.css";

const COPIED_TO_CLIPBOARD_MESSAGE_DELAY = 2000;

const Palette = ({ colors }) => {
  const [wasCopied, setWasCopied] = useState(false);
  const [appliedColor, setAppliedColor] = useState("");
  const handleMouseOver = useCallback(
    (color) => () => {
      document.body.style.backgroundColor = color;
      setAppliedColor(color);
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
          className={`palette ${appliedColor === color ? "applied" : ""}`}
          key={`palette-${color}`}
          onMouseOver={handleMouseOver(color)}
          onClick={handleClick(color)}
          style={{ backgroundColor: color }}
        >
          <span
            style={{
              backgroundColor: wasCopied === color ? "black" : color,
              color: wasCopied === color ? "#ccc" : color,
            }}
            className="copied-message"
          >
            copied
          </span>
        </span>
      ))}
    </div>
  );
};

Palette.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default Palette;
