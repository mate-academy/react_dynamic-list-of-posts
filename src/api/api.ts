export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, action?:{}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, action);

    return await response.json();
  } catch (error) {
    return `Error: ${error}`;
  }
};
