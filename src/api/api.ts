export const BASE_URL = 'https://mate.academy/students-api';

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users/`);

  return response.json();
};
