import { request } from './api';

export const getPosts = () => request('/posts');

export const getUserPosts = userId => request(`/posts?userId=${userId}`);

export const getPostDetails = postId => request(`/posts/${postId}`);
