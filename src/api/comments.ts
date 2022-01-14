const BASE_URL = 'https://mate.academy/students-api/comments?postId=';

export const getAllComments = (postId: number) => {
  return fetch(`${BASE_URL}${postId}`)
    .then(response => response.json());
};

const url = 'https://mate.academy/students-api/comments';

export const postComment = (postId: number, name: string, email: string, body: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  };

  fetch(url, options);
};

export const deleteComment = (postId: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  fetch(`${url}/${postId}`, options);
};
