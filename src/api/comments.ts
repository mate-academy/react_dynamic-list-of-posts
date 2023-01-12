import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postID: number) => {
  return client.get<Comment[]>(`/comments?postId=${postID}`);
};

export const addComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const removeComment = (comentID: number) => {
  return client.delete(`/comments/${comentID}`);
};
