import { Comment } from '../types/Comment';
import { BASE_URL } from './api';

export const addComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId, name, email, body,
    }),
  })
    .then(response => response.json());
};
