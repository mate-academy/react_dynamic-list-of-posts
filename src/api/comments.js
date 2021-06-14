import { getData } from './api';

const BASE_URL = 'https://mate-api.herokuapp.com';
const url = 'comments';

export const getPostComments = postId => getData(`${url}?postId=${postId}`);

export const addComment = ({
  postId, name, email, body,
}) => (fetch(`${BASE_URL}/${url}`, {
  method: 'POST',
  body: JSON.stringify({
    postId, name, email, body,
  }),
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
})
  .then(response => response.json())
  .then(result => result.data));

export const deleteComment = commentId => fetch(
  `${BASE_URL}/${url}/${commentId}`, {
    method: 'DELETE',
  },
)
  .then(response => response.json())
  .then(result => result.data);
