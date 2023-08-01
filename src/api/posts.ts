import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getPosts = ({ id }: User) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};
