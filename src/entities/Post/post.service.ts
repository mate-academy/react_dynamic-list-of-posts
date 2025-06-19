import { client } from '../../utils/fetchClient';
import { User } from '../User/User';
import { Post } from './Post';

export const getUserPosts = (userId: User['id']) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
