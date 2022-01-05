export const BASE_URL = 'https://mate.academy/students-api';

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
};
