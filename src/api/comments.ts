const BASE_URL = 'https://mate.academy/students-api';

export const loadPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deleteComment = async (id: number) => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });

  return response.json();
};

export const addComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<PostComm> => {
  const response = await fetch(`${BASE_URL}/comments`, {
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

  return response.json();
};
