// A very naive conversion method
const rgbArrayToHex = (arr = [0, 0, 0]) => {
    const hex = arr.map(v => v.toString(16)).join('');
    return `#${hex}`;
}

const rgbArrayToRgb = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

export { rgbArrayToHex, rgbArrayToRgb };
