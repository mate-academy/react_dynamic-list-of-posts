import { Comment } from '../types/Comment';

import {
  post, remove, request, wait,
} from './api';

export const getPostComments = async (postId: number) => {
  await wait(1000);

  return request(`/comments?postId=${postId}`);
};

export const removePostComment = (commentId: number) => {
  return remove(`/comments/${commentId}`);
};

export const addPostComment = (data: Omit<Comment,
'id' | 'createdAt' | 'updatedAt'>) => {
  return post('/comments', data);
};
