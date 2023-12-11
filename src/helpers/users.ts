import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
