import { CommentToPost } from '../types/CommentToPost';
import { getData } from './posts';
import { BASE_URL } from './api';

export const getPostComments = (postId: number) => getData(`/comments?postId=${postId}`);

export const removeComment = (commentId: string) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const createComment = (comment: CommentToPost) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};
