import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

// sending request to get array of user posts by user id
export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
