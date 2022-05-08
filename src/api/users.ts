import { request } from './api';
import { User } from '../types/user';

export const getUsers = ():Promise<User[]> => {
  return request('/users');
};
