import { BASE_URL, request } from './api';

export const getAllPosts = () => request(`${BASE_URL}/posts`)
  .then(result => result.data);

export const getUserPosts = userId => getAllPosts()
  .then(result => result.filter(post => post.userId === userId));
