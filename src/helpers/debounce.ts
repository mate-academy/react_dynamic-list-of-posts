export const debounce = (f: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      f(value);
    }, delay);
  };
};
