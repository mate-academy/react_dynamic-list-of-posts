import { client } from './utils/fetchClient';

// import { User } from "./types/User";
// import { Post } from "./types/Post";

export const getUsers = () => {
  return client.get('/users');
};

export const getUserPosts = (userId) => {
  return client.get(`/posts?userId=${userId}`);
};

export const getUser = (userId) => {
  return client.get(`/users/${userId}`);
};

export const getPostComments = (postId) => {
  return client.get(`/comments?postId=${postId}`);
};

export const getUserPost = (postId) => {
  return client.get(`/posts/${postId}`);
};

export const addPostComment = (postId, data) => {
  return client.post(`/comments?postId=${postId}`, data);
};

export const deletePostComment = (commentId) => {
  return client.delete(`/comments/${commentId}`);
};
