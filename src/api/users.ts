import { User } from '../types/User';

import { request } from './request';

export const getAllUsers = (): Promise<User[]> => {
  return request('/users');
};
