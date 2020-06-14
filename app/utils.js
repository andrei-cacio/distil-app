const rgbArrayToRgb = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;


const blobToImage = blob => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        }

        reader.readAsDataURL(blob);
    });
}


const blobToBuffer = blob =>  {
    if (blob.arrayBuffer) {
        return blob.arrayBuffer();
    }

    // For Safari
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        }

        reader.readAsArrayBuffer(blob);
    });
}

export { rgbArrayToRgb, blobToBuffer, blobToImage };
