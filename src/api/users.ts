import { BASE_URL } from './api';

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return null;
};
