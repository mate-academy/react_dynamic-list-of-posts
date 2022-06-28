export const BASE_URL = 'https://mate.academy/students-api/';

export async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
}
