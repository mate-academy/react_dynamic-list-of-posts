export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const responce = await fetch(url);

  return responce.json();
};
