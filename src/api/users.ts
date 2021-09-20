import { request } from './api';

export const getUsers = () => request('/users');
