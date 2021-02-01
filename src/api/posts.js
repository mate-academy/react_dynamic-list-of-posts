import { request } from './api';

export const getUserPosts = userId => request(`/posts?userId=${userId}`);
export const getAllPosts = () => request(`/posts`);
// eslint-disable-next-line
export const getPostDetails = postId => request(`/posts/${postId}`);
