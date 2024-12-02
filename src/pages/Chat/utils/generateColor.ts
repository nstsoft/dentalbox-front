export const generateColor = (name: string): string => {
  let colorHash = 0;
  for (let charIndex = 0; charIndex < name.length; charIndex++) {
    colorHash = name.charCodeAt(charIndex) + ((colorHash << 5) - colorHash);
  }
  return `hsl(${colorHash % 360}, 70%, 60%)`;
};
