export const loadFromServer: (url: string) => Promise<any> = async url => {
  const response = await fetch(url);

  return response.json();
};
