import { request } from './api';

export const getPosts = async() => request('/posts');

export const getPost = async postId => request(`/posts/${postId}`);
