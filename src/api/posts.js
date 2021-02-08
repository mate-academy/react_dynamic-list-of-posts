import { request } from './api';

export const getUserPosts = async() => request('/posts');

export const getPostDetails = async postId => request(`/posts/${postId}`);
