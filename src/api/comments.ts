import { Comment, СommentID } from '../types/Comment';
import { PostID } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getComments = (postId: PostID) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', newComment);
};

export const deleteComment = (id: СommentID) => {
  return client.delete(`/comments/${id}`);
};
