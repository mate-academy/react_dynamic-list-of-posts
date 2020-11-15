import { BASE_URL } from './api';

export const getUsers = async() => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`${response.status} - Users is ${response.statusText}`);
  }

  const json = await response.json();

  return json.data.filter(user => user.id <= 10);
};
