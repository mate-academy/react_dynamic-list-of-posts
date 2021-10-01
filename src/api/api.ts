const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options = {}) => {
  const data = await fetch(`${BASE_URL}${url}`, options);

  return data.json();
};
