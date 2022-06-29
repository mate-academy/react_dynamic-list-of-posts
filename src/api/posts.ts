import { BASE_URL } from './api';

export async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts${userId === 0 ? '' : `?userId=${userId}`}`);
  const res = await response.json();

  if (res.Response === 'False') {
    throw new Error('Something went wrong.');
  }

  return res;
}
