import { BASE_URL, request } from './api';
import { User } from '../types/user';

export async function getUsers() {
  return request<User[]>(`${BASE_URL}/users`);
}
