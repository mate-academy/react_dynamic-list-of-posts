export const BASE_URL = 'https://mate.academy/students-api';

export const getRequest = async (bodyRequest: string) => {
  const response = await fetch(`${BASE_URL}${bodyRequest}`);

  if (!response.ok) {
    throw new Error(`${response.status}| ${response.text}`);
  }

  return response.json();
};
