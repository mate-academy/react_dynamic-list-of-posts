import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number | null) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number | null) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (
  postId: number,
  commentData: Omit<Comment, 'id' | 'postId'>,
) => {
  return client.post<Comment>(`/comments`, {
    ...commentData,
    postId: postId,
  });
};
