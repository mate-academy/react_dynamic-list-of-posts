export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, option?:{}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, option);

    return await response.json();
  } catch (error) {
    return 'Error';
  }
};
