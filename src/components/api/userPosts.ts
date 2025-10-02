import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

export const getUserPosts = (id: number | null) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};
