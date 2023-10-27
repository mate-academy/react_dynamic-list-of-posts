import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getPosts = (user: User | null) => {
  return client.get<Post[]>(`/posts?userId=${user?.id}`);
};
