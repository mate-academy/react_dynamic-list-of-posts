import { request } from './api';

export const getPosts = () => request('/posts');

export const getPost = postId => request(`/posts/${postId}`);

export const getPostsByUser = userId => request(`/posts?userId=${userId}`);
