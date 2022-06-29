const BASE_URL = 'https://mate.academy/students-api';

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const addPostComments = async (
  name: string,
  email: string,
  body: string,
  postId: number,
) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      body,
      postId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const deleteComments = async (index: number) => {
  await fetch(`${BASE_URL}/comments/${index}`, {
    method: 'DELETE',
  });
};
