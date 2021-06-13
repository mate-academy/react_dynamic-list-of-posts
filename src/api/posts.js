import { get } from './api';

export const getAllPosts = () => get('/posts');

export const getUserPosts = userId => get(`/posts?userId=${userId}`);

export const getPost = postId => get(`/posts/${postId}`);
