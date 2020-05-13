export const debounce = (f, delay) => {
  let timerId;

  const debounced = (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };

  return debounced;
};
