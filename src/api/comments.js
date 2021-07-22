import { BASE_URL } from './api';

const request = (url, method) => fetch(`${BASE_URL}${url}`, method);

export const getPostComments = async(postId) => {
  const response = await request(`/comments?postId=${postId}`);
  const json = await response.json();

  return json.data;
};

export const removeComment = id => (
  request(`/comments/${id}`, { method: 'DELETE' })
);

export const addNewComment = newComment => request('/comments', {
  method: 'POST',
  headers: {
    'Content-type': 'aplication/json; charset=utf-8',
  },
  body: JSON.stringify(newComment),
});
