import { request } from './api';

export const getUsers = (userId = '') => request(`/users/${userId}`);
