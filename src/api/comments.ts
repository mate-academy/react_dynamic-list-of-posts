import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: Post['id']) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deletePostComment = (commentId: Comment['id']) => {
  return client.delete<Comment>(`/comments/${commentId}`);
};

export const addPostComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, comment);
};
