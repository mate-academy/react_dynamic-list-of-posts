import { IPost } from '../types/Post.interface';

import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: number) => (
  client.get<IPost[]>(`/posts?userId=${userId}`)
);
