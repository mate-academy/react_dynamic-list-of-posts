import { request } from './api';

const USERS_URL = '/users?limit=10';

export const getUsers = () => request(USERS_URL);
