export const debounce = (f, delay) => {
  let timerID;

  return (...args) => {
    clearTimeout(timerID);
    timerID = setTimeout(f, delay, ...args);
  };
};
