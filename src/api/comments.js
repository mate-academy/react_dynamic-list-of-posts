import { BASE_URL } from './api';

export const getPostComments = postID => fetch(`${BASE_URL}/comments`)
  .then(res => res.json()).then(result => result.data
    .filter(comment => comment.postId === postID));

export const removeComment
  = commentId => fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });

export const addComment = comment => fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(comment),
});

export const addTodo = () => (
  fetch('https://mate-api.herokuapp.com/goods', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(
      {
        name: 'Potato',
        color: 'red',
      },
    ),
  })
);
