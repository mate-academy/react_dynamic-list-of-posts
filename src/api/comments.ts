import { post, remove } from './api';

export const removeComment = (commentId: number) => {
  return remove(commentId);
};

export const addNewComment = (comment: NewComment) => {
  return post('/comments', comment);
};
