export const BASE_URL = 'https://mate.academy/students-api';

export const getAllUsers = async () => {
  const users = await fetch(`${BASE_URL}/users`);

  return users.json();
};
