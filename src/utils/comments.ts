import { COMMENTS_URL } from '../constants/api';
import { loadData } from './api';
import { Comment } from '../constants/types';

export const loadComments = async (): Promise<Comment[]> => {
  return loadData<Comment>(COMMENTS_URL);
};
