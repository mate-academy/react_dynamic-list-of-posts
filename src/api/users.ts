import { User } from '../types/User';
import { BASE_URL, request } from './api';

export const getAllUsers = (): Promise<User[]> => {
  return request(`${BASE_URL}/users`);
};
