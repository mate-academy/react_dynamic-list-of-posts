import { request } from './api';

export const getUsers = (): Promise<User[]> => request('/users');
