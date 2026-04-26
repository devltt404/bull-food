export const createFadeStagger = (start: number, step = 0.1) => {
  let current = start;
  return () => {
    const style = { animationDelay: `${current}s` };
    current += step;
    return { style };
  };
};
