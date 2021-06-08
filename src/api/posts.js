import { get } from './api';

export const getPosts = () => get(`/posts`);

export const getUserPosts = userId => get(`/posts?userId=${userId}`);

export const getPostDetails = postId => get(`/posts/${postId}`);
