const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options: RequestInit | undefined) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
};
