export const BASE_URL = 'https://mate.academy/students-api';

export const requestOnAPI = async (url:string, obj = {}) => {
  const response = await fetch(`${BASE_URL}/${url}`, obj);

  if (!response.ok) {
    throw new Error('Error of loading');
  }

  return response.json();
};
