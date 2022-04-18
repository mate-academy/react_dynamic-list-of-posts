import { Comment } from '../types/Comment';

import {
  post, remove, request,
} from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const removePostComment = (commentId: number) => {
  return remove(`/comments/${commentId}`);
};

export const addPostComment = (data: Omit<Comment,
'id' | 'createdAt' | 'updatedAt'>) => {
  return post('/comments', data);
};
