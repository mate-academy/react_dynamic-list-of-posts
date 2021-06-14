import { getData } from './api';

export const getUsers = async() => {
  const usersFromServer = await getData('/users');

  return usersFromServer;
};
