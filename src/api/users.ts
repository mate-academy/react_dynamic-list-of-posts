import { BASE_URL, request } from './api';

const USER_URL = `${BASE_URL}/users`;

export const getAllUsers = () => request(USER_URL);

export const getUserById = (id: number) => request(`${USER_URL}/${id}`)

export const getUserByName = (name: string) => request(`${USER_URL}?username=${name}`)
