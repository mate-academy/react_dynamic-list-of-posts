const BASE_URL = 'https://mate.academy/students-api';

export const request = async (endpoint = '', options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};
