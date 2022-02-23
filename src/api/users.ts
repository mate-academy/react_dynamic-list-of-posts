const BASE_URL = 'https://mate.academy/students-api/users';

export const getUsers = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};
