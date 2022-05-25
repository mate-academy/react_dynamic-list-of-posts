import { request } from './api';

export const getUsersPosts = () => request('/posts');

export const getUserPostsByID = (userId: number) => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => request(`/posts/${postId}`);
