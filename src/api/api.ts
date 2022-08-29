export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
