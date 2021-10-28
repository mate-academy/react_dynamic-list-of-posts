import { getData } from './api';
import { User } from '../types/User';

export const getUsers = (): Promise<User[]> => {
  return getData<User[]>('/users');
};
