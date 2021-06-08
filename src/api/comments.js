import { get, post, remove } from './api';

export const getPostComments = () => get('comments');
export const createPostComment = (postId, name, email, body) => (
  post('comments', {postId, name, email, body})
);
export const deletePostComment = (id) => get(`comments/${id}`);
