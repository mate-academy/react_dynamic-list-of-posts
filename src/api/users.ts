import { User } from '../types/user';

export const BASE_URL = 'https://mate.academy/students-api';

function get<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => response.json());
}

export function getUsers() {
  return get<User[]>('/users');
}
