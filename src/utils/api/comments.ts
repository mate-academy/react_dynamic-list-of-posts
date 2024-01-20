import { Comment } from '../../types/Comment';
import { client } from '../fetchClient';

export const addComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    postId,
    name,
    email,
    body,
  });
};

export const deleteComment = (CommentId: string) => {
  return client.delete(`/comments/${CommentId}`);
};
