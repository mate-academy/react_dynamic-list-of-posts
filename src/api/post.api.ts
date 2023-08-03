import { client } from '../utils/fetchClient';
import { ApiEndpoint } from '../utils/constants';
import { IPost } from '../models/IPost';

export const getPostsByUser = (userId: number) => {
  return client.get<IPost[]>(ApiEndpoint.PostsByUser + userId);
};
