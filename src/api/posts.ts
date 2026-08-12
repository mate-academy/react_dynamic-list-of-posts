import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

const PATH = '/posts';

export const getPostsByUser = (userId: number) => {
  return client.get<Post[]>(`${PATH}?userId=${userId}`);
};
