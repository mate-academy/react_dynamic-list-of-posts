import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
