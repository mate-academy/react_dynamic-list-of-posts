import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = ({
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
