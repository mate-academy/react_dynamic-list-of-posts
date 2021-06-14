import { request } from './api';

export const getPosts = () => request(`/posts`);

export const getUserPosts = userId => getPosts()
  .then(res => res.filter(post => (post.userId === userId)));

export const getPostDetails = postId => request(`/posts/${postId}`);
