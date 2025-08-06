import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getPosts = (useId: User['id']) => {
  return client.get<Post[]>(`/posts?userId=${useId}`);
};
