export const debounce = (f, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(f, delay, ...args);
  };
};
