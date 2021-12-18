import { request } from './api';

export const getPostDetailes = async (id:number) => {
  const post = await request(`/posts/${id}`);

  return post;
};

export const getUserPosts = async (id = 0) => {
  const posts = await request('/posts');

  if (id === 0) {
    return posts;
  }

  return posts.filter((post: Post) => post.userId === id);
};

export const getUsers = () => request('/users');
