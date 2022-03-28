import { User } from '../react-app-env';
import { request } from './api';

export const getUsers = (): Promise<User[]> => {
  return request('/users');
};
