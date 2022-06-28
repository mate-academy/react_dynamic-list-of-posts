export const BASE_URL = 'https://mate.academy/students-api';

export const getAllUsers = async () => {
  const request = await fetch(`${BASE_URL}/users`);

  return request.json();
};
