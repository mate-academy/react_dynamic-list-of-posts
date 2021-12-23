import { request } from './api';

export const getPostDetailes = async (id:number) => {
  const post = await request(`/posts/${id}`, { method: 'GET' });

  return post;
};

export const getUserPosts = async (id = 0) => {
  const posts = await request('/posts', { method: 'GET' });

  if (id === 0) {
    return posts;
  }

  return posts.filter((post: Post) => post.userId === id);
};

export const getUsers = () => request('/users', { method: 'GET' });
