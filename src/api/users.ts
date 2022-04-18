import { User } from '../types/user';
import { request } from './api';

export const getUsers = (): Promise<User[]> => request('/users');
