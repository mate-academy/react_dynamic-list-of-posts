import { BASE_URL } from './api';
import { NewComment } from '../react-app-env';

export async function getComments(id: number) {
  return fetch(`${BASE_URL}/comments/?postId=${id}`)
    .then(response => response.json());
}

export async function addComment(comment: NewComment) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  };

  fetch(`${BASE_URL}/comments`, requestOptions)
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
}

export async function removeComment(id: number) {
  const requestOptions = {
    method: 'DELETE',
  };

  fetch(`${BASE_URL}/comments/${id}`, requestOptions)
    .then(response => response)
    .catch(error => {
      throw new Error(error);
    });
}
