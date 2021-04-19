const BASE_URL = 'https://mate-api.herokuapp.com';

export const getUsers = async() => {
  const response = await fetch(`${BASE_URL}/users`);
  const users = await response.json();

  return users.data;
};
