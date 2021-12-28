import { BASE_URL } from './api';

export const getPostComments = (postId: number) => {
  const url = `${BASE_URL}/comments/?postId=${postId}`;

  return fetch(url)
    .then(res => res.json());
};

export const addComment = ({
  postId,
  name,
  body,
  email,
}: CommentBody) => {
  const url = `${BASE_URL}/comments`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId,
      name,
      body,
      email,
    }),
  })
    .catch(err => err);
};

export const deleteComment = (commentId: number) => {
  const url = `${BASE_URL}/comments/${commentId}`;

  return fetch(url, {
    method: 'DELETE',
  })
    .catch(err => err);
};
