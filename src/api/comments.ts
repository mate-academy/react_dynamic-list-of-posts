import { client } from '../utils/fetchClient';

export const getComments = (postId: number) =>
  client.get(`/comments?postId=${postId}`);

export const addComment = (comment: any) => client.post('/comments', comment);

export const deleteComment = (id: number) => client.delete(`/comments/${id}`);
