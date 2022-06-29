export const BASE_URL = 'https://mate.academy/students-api';

export async function getPosts(): Promise<Posts[]> {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
}
