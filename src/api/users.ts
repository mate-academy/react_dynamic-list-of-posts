import { BASE_URL } from './api';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users/`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const users = await response.json();

    return users.slice(0, 10);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return [];
};
