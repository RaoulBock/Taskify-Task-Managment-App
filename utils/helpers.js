export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";

  const generateColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let color;
  do {
    color = generateColor();
  } while (color === "#000000"); // Regenerate if color is black

  return color;
};
