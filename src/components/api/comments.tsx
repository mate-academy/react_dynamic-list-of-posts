import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

export const getCommentsOfPost = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createCommentOnPost = ({
  postId, name, email, body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
};

export const deleteCommentFromPost = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
