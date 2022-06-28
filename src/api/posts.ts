import { BASE_URL } from './api';

export async function getUserPosts(userId: number): Promise<Post[]> {
  const request = await fetch(`${BASE_URL}/posts${userId === 0 ? '' : `?userId=${userId}`}`);
  const res = await request.json();

  if (res.Response === 'False') {
    throw new Error('Something went wrong.');
  }

  return res;
}
