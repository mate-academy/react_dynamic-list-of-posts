import { POSTS_URL } from '../constants/api';
import { loadData } from './api';
import { Post } from '../constants/types';

export const loadPosts = async (): Promise<Post[]> => {
  return loadData<Post>(POSTS_URL);
};
