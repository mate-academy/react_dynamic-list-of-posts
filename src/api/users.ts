import { client } from '../utils/fetchClient';

export const getAll = () => {
  return client.get('/users');
};
