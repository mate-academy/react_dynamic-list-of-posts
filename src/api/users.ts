import { getRequest } from './api';

export const getUsers = async (): Promise<User[]> => getRequest('/users');
