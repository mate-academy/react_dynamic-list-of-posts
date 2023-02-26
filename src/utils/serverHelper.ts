import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = async () => {
  const response = await client.get<User[]>('/users');

  return response;
};

export const getPosts = async (userId: number) => {
  const response = await client.get<Post[]>(`/posts?userId=${userId}`);

  return response;
};
