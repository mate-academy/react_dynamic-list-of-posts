import { getRequest } from './api';

export const getAllUsers = async (): Promise<User[]> => getRequest('/users');
