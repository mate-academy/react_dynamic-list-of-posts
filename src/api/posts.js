import { request } from './api';

export const getUserPosts = userId => request(`/posts?userId=${userId}`);

export const getPosts = () => request('/posts');

export const getOnePost = postId => request(`/posts/${postId}`);
