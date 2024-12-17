import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get(`/posts?userId=${userId}`);
};
