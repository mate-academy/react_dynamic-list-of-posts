import { get } from './api';
import User from '../components/types/User';

export const getUsers = (): Promise<User[]> => {
  return get<User[]>('/users');
};
