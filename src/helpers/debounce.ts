export const debounce = (f: Function, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;

  const debounced = () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => f, delay);
  };

  return debounced;
};
