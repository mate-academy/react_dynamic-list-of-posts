import { request } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const getComments = () => request('/comments');
