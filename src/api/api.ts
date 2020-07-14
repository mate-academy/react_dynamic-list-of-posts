export const fetchData = async <T>(name: string): Promise<T[]> => {
  const response = await fetch(`https://mate-academy.github.io/react_dynamic-list-of-posts/api/${name}.json`);
  const data = await response.json();

  return data;
};
