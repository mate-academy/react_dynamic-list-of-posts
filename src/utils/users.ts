import { USERS_URL } from '../constants/api';
import { loadData } from './api';
import { User } from '../constants/types';

export const loadUsers = async (): Promise<User[]> => {
  return loadData<User>(USERS_URL);
};
