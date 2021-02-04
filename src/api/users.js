import { request } from './api';

export const getUsers = async() => request('/users');
