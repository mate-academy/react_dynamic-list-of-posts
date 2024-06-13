import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComment = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const getDelate = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};

export const postComment = ({ name, email, body, postId }: Comment) => {
  return client.post<Comment>(`/comments`, { name, email, body, postId });
};
