export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }

  return response.json();
};
