import { get, post, remove } from './api';

export const getPostComments = (endpoint) => get(`comments${endpoint}`);
export const createPostComment = (postId, name, email, body) => (
  post('comments', {postId, name, email, body})
);
export const deletePostComment = (id) => remove(`comments/${id}`);
