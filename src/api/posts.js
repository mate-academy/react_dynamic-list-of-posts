import { request } from './api';

export async function getUserPosts(userId) {
  const posts = await request('/posts');

  return userId > 0 ? posts.filter(post => post.userId === +userId) : posts;
}

export async function getPostDetails(postId) {
  const result = await request(`/posts/${postId}`);

  return result;
}
