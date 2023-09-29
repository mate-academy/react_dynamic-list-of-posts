import { client } from './fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';

export const getAllUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (selectedUser: User) => {
  return client.get<Post[]>(`/posts?userId=${selectedUser?.id}`);
};

export const getPostComments = (selectedPost: Post | null) => {
  return client.get<Comment>(`/comments?postId=${selectedPost?.id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
