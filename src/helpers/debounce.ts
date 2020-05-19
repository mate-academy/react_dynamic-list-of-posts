export const debounce = (f: any, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: Array<string>) => {
    clearTimeout(timer);

    timer = setTimeout(f, delay, ...args);
  };
};
