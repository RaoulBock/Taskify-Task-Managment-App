export const getRandomSoftColor = () => {
  const generateColor = () => {
    // Soft colors have high values but not too close to 255 to avoid strong colors
    const r = Math.floor(Math.random() * 128) + 127; // 127 to 255
    const g = Math.floor(Math.random() * 128) + 127; // 127 to 255
    const b = Math.floor(Math.random() * 128) + 127; // 127 to 255

    return `rgb(${r},${g},${b})`;
  };

  let color;
  do {
    color = generateColor();
  } while (color === "rgb(255,255,255)"); // Regenerate if color is white

  return color;
};

export const generateCode = () => {
  const code = Math.floor(10000 + Math.random() * 90000); // Generates a number between 10000 and 99999
  return code;
};
