import { request } from './request';

export const getUsers = (userId = '') => request(`/users${userId}`);
