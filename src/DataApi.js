export const loadFromServer = async(URL) => {
  const response = await fetch(URL);

  return response.json();
};
