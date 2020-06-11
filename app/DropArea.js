import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import "./drop-area.css";

const DROP_STATES = {
  HOVER: "HOVER",
  IDLE: "IDLE",
};

const DROP_STATES_STYLES = {
  [DROP_STATES.IDLE]: "",
  [DROP_STATES.HOVER]: "file-over",
};

const DropArea = ({ allowedFiles, onFile }) => {
  const [dropState, setDropState] = useState(DROP_STATES.IDLE);

  const handleDragEnter = useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
    setDropState(DROP_STATES.HOVER);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDropState(DROP_STATES.IDLE);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDropState(DROP_STATES.IDLE);

    const file = e.dataTransfer.files[0];

    if (allowedFiles.includes(file.type)) {
      file.arrayBuffer().then(buffer => onFile(buffer));
    } else {
      alert('Only JPEG allowed');
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragEnd={handleDragLeave}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragEnter}
      className={`drop-area ${DROP_STATES_STYLES[dropState]}`}
    >
      <span className="drop-message">
        Drop an image here <i>(jpeg)</i>
      </span>
    </div>
  );
};

DropArea.propTypes = {
  allowedFiles: PropTypes.oneOf(['image/jpeg'])
}

DropArea.defaultProps = {
  allowedFiles: 'image/jpeg'
}

export default DropArea;
