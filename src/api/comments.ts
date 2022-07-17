import { BASE_URL } from './api';

export const getPostComments = (postId: number): Promise<CommentType[]> => {
  return (fetch(`${BASE_URL}/comments/?postId=${postId}`).then(promise => promise.json()));
};

export const createComment = (comment: CommentType) => {
  return (fetch(
    `${BASE_URL}/comments/`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    },
  ));
};

export const removeComment = (id: number) => {
  return fetch(
    `${BASE_URL}/comments/${id}`,
    {
      method: 'DELETE',
    },
  );
};
