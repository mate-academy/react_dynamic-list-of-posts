import { request, BASE_URL } from './posts';

export const getPostComments = (postId: string) => request(
  `/comments?postId=${postId}`,
);

export const createComment = async (newComment : NewComment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  })
    .then(response => response.json());
};
