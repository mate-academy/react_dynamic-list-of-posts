import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments/`);
  const postComments = await response.json();

  const filteredPostComments = postComments.data.filter(postComment => (
    postComment.postId === Number(postId)));

  return filteredPostComments;
};

export const postCommentToServer = async(comment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset-UTF-8',
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    return 'Error';
  }

  const postComent = response.json();

  return postComent.data;
};
