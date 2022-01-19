const BASE_URL = 'https://mate.academy/students-api';

export const createCommemt = (postId: number, name: string, email: string, body: string) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};
