import { request } from './api';

export const getPosts = () => request('/posts');

export const getPostDetails = (postId: number) => request(`/posts/${postId}`);
