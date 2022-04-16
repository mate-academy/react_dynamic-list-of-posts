import { request } from './api';

export const getPostComments = (postId: number) => request(`/comments?postId=${postId}`);
