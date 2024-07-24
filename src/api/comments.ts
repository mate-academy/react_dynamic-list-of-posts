import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = ({ name, email, body }: CommentData) => {
  return client.post<CommentData>('/comments', {
    name: name,
    email: email,
    body: body,
  });
};
