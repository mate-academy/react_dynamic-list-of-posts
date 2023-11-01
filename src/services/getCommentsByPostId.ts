import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export const addNewComment = ({
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

export function deleteComment(commentId: number) {
  return client.delete<number>(`/comments/${commentId}`);
}
