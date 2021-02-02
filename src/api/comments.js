import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(result => result.data)
  .then(comments => comments
    .filter(comment => (comment.postId === postId)));

// eslint-disable-next-line
export const postComments = (id, title, email, userName) => fetch(`${BASE_URL}/comments`, {
  method: `POST`,
  body: JSON.stringify({
    postId: id,
    body: title,
    email,
    name: userName,
  }),
})
  .then(response => response.json())
  .then(result => result.data);

// eslint-disable-next-line
export const deleteComments = url => fetch(`https://mate-api.herokuapp.com/comments/${url}`, {
  method: `DELETE`,
});
