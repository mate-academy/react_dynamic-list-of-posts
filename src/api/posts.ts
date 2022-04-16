import { request } from './api';

export const getPosts = () => request('/posts');

export const getUserPosts = (userId: number) => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => request(`/posts/${postId}`);
