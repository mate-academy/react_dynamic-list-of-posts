import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
