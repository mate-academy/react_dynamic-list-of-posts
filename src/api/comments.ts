import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/commnets?postId=${postId}`);
};

export const deleteComments = (commentId: Comment['id']) => {
  return client.delete(`/commnets/${commentId}`);
};

export const addComments = (
  postId: Post['id'],
  authorName: string,
  authorEmail: string,
  commentBody: string,
) => {
  return client.post<Comment>('/commnets', {
    postId: postId,
    name: authorName,
    email: authorEmail,
    body: commentBody,
  });
};
