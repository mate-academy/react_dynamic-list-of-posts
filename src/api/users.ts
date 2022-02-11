import { BASE_URL } from './api';

export async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
}
