import { request } from './request';
import { User } from '../types/User';

export const getUsers = () => {
  return request<User[]>('/users');
};
