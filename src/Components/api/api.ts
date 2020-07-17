export const loadData = async <T>(url: string): Promise<T[]> => {
  const responsed = await fetch(url).then(response => response.json());

  return responsed;
};
