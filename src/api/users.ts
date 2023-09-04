/* eslint-disable object-curly-newline */
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};
