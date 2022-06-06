import { request } from './api';
import { User } from '../types/User';

export const getUsers = (): Promise<User[]> => {
  return request('/users/');
};
