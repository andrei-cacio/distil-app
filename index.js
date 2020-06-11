import { distil } from 'distil';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

ReactDOM.render(<App />, document.getElementById('app'));

const renderColors = async (imageName) => {
	const response = await fetch(imageName);
	const blob = await response.blob();
	const result = await new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  reader.onloadend = () => {
	    if (reader.result instanceof ArrayBuffer) {
	      return resolve(reader.result);
	    } else {
	      return reject(new Error("Could not create arraybuffer"));
	    }
	  };
	  reader.onerror = reject;
	  reader.readAsArrayBuffer(blob);
	});


	const colors = distil(new Uint8Array(result));

	const container = document.body;
	container.innerHTML = '';
	console.log(colors);
	colors.forEach(([r, g, b]) => {
		const span = document.createElement('span');
		span.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
		span.style.width="100px";
		span.style.height="100px";
		span.style.display="inline-block";
		container.appendChild(span);
	});
};

window.distil = renderColors;
