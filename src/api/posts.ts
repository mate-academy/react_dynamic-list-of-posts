import { Post } from '../types/Post';
import { UserID } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: UserID) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
