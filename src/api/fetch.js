export const getData = async(URL) => {
  const response = await fetch(URL);

  return response.json();
};
