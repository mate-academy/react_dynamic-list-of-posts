import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) =>
  client.get(`/posts?userId=${userId}`);
