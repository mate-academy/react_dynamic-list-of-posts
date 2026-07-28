import { CommentData } from '../../types/Comment';
import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';

export const getUser = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get(`/comments?postId=${postId}`);
};

export const addComment = (comment: CommentData, postId: number) => {
  return client.post('/comments', {
    ...comment,
    postId,
  });
};

export const deleteComments = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
