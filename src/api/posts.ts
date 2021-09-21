import { request } from './api';

export const getPosts = () => request('/posts');

export const getUserPosts = (userId: string) => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: string) => request(`/posts/${postId}`);
