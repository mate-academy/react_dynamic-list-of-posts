import { request, remove, post } from './api';

export const getAllPosts = () => request(`/posts`);

export const getAllUsers = () => request(`/users`);

export const getUserPosts = userId => request(`/posts?userId=${userId}`);

export const getPostDetails = postId => request(`/posts/${postId}`);

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const deleteComment = commentId => remove(`/comments/${commentId}`);

export const addComment = comment => post(`/comments`, comment);
