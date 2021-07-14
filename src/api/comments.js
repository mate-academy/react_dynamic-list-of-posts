import { BASE_URL } from './api';

const request = (url, method) => fetch(`${BASE_URL}${url}`, method)
  .then(response => response.json())
  .then(json => json.data);

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const removeComment = (id) => {
  request(`/comments/${id}`, { method: 'DELETE' });
};

export const addNewComment = (newComment) => {
  if (!newComment) {
    return;
  }

  request('/comments/', {
    method: 'POST',
    headers: {
      'Content-type': 'aplication/json; charset=utf-8',
    },
    body: JSON.stringify(newComment),
  });
};
