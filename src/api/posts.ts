import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (selectedUserId: number) => {
  return client.get<Post[]>(`/posts?userId=${selectedUserId}`);
};
