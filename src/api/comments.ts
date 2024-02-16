import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

type NewPost = {
  postId: number,
  name: string,
  email: string,
  body: string,
};

export const addComments = (newPost: NewPost) => {
  return client.post<Comment>('/comments', newPost);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
