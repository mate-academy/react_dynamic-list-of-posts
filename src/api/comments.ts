import { BASE_URL } from './api';
import { Comment } from '../react-app-env';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`).then(response => response.json());
};

export const deleteComment = (commentId: number) => {
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const createComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> => {
  return fetch(`${BASE_URL}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
    }).then(responce => responce.json());
};
