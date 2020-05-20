let timeout: NodeJS.Timeout;

export const debounce = (func: () => void, delay: number) => {
  clearTimeout(timeout);
  timeout = setTimeout(func, delay);
};
