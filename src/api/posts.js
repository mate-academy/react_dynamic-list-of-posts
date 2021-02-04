import { remove, request, post } from './api';

export const getAllPosts = () => request(`/posts`);

export const getUserPosts = userId => request(`/posts?userId=${userId}`);

export const getPostDetails = postId => request(`/posts/${postId}`);

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const deleteComment = id => remove(`/comments/${id}`);

export const addComment = data => post(`/comments`, data);
