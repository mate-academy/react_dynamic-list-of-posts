import { BASE_URL, fetchData } from './api';

const USERS_REQUEST_URL = `${BASE_URL}/users`;

export const getUsers = async() => {
  const users = await fetchData(USERS_REQUEST_URL);

  return users.data.slice(0, 10).map(({ id, name }) => ({
    id,
    name,
  }));
};
