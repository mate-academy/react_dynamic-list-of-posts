export const BASE_URL = 'https://mate.academy/students-api/';

export const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error('Some problems with fetch');
  }

  return response.json();
};
