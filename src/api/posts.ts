import { request } from './api';

export const getUserPosts = (userId: string) => request(`/posts${userId}`);

export const getPostDetails = (postId: string) => request(`/posts/${postId}`);
