import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getComments = (postData: Post | null) => {
  return client.get<Comment[]>(`/comments?postId=${postData?.id}`);
};

export const createComment = (comment: Partial<Comment>) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
