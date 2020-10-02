import { BASE_URL } from './api';

const COMMENTS_URL = `${BASE_URL}/comments`;

async function sendRequest(path, option) {
  const response = await fetch(path, option);
  const result = await response.json();

  return result.data;
}

export const getPostComments = postId => sendRequest(COMMENTS_URL)
  .then(comments => comments.filter(comment => (
    comment.postId === postId
      && comment.body
      && comment.body.trim()
  )));

export const deleteComment = commentId => sendRequest(
  `${COMMENTS_URL}/${commentId}`, {
    method: 'DELETE',
  },
);

export const addNewComment = ({ postId, name, email, body }) => sendRequest(
  COMMENTS_URL, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  },
);
