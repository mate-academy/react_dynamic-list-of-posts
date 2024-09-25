import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createNewComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  return client.post<Comment>(`/comments`, {
    postId,
    name,
    email,
    body,
  });
};

export const deleteComment = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};
