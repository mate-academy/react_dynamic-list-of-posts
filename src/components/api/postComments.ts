import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

export const getPostComments = (id: number | null) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addNewPostComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, comment);
};

export const deletePostComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
