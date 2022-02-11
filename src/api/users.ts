export const BASE_URL = 'https://mate.academy/students-api/users/';

export async function getUsers(): Promise<User[]> {
  const posts = await fetch(`${BASE_URL}`);

  return posts.json();
}
