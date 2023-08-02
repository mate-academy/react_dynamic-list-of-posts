import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Parameters = {
  name: string;
  email: string;
  body: string;
  postId: number;
};

export const getComments = ({ id }: Post) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (
  comment: Parameters,
) => {
  return client.post<Comment>('/comments', comment);
};
