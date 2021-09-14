import { Comment } from '../components/types/Comment';
import { BASE_URL } from './api';

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(data => data.json())
    .then(result => result);
};

export const addingComment = (data: Comment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json());
};

export const deleteComment = (idOfComment: number) => fetch(`${BASE_URL}/comments/${idOfComment}`,
  { method: 'DELETE' });
