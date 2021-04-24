import { request } from './api';

export const getAllPosts = () => request('/posts');

export const getUserPosts = userId => request(`/posts?userId=${userId}`);

export const getPostDetails = postId => request(`/posts/${postId}`);
