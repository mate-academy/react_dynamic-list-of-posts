const BASE_URL = 'https://mate.academy/students-api/comments';

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}?postId=${postId}`);

  return response.json();
};

export const deleteComment = async (commentId: number) => {
  return fetch(`${BASE_URL}/${commentId}`,
    { method: 'DELETE' });
};

export const postComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return response.json();
};
