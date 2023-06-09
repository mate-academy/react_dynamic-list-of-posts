import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const postsFromServer = (userID: number) => client
  .get<Post[]>(`/posts?userId=${userID}`);
