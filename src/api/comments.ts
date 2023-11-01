import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getComments = (postId : Post['id']) => {
  client.get(`comments?postId=${postId}`);
};
