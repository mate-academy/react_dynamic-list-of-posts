import { User } from '../types/User';
import { client } from '../utils/fetchClient';

const PATH = '/users';

export const getUsers = () => {
  return client.get<User[]>(PATH);
};
