import { request } from './helpers';

export async function getPostsByUserId(userId: number) {
  const posts = await request(`?userId=${userId}`);

  return posts;
}

export async function getAllPost() {
  const posts = await request('/posts');

  return posts;
}
