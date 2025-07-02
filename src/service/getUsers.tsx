import { client } from '../utils/fetchClient';

export const getUsersFromServer = async () => {
  return client.get('/users');
};
