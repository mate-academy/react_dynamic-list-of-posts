import { BASE_URL } from './api';

export const getComments = () => fetch(`${BASE_URL}/comments/`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(comments => comments.data);

export const deleteComment = id => fetch(`${BASE_URL}/comments/${id}`, {
  method: 'DELETE',
}).then(comments => comments.json()).then(comments => comments.data);
