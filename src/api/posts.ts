import { request } from './api';

export const getAllPosts = () => request('/posts');

export const getUserPosts = (userId: number) => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => request(`/posts/${postId}`);
