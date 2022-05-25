import { request } from './api';

export const getUserByName = (username: string) => request(`/users?name=${username}`);
