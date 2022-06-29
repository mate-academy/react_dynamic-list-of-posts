import { BASE_URL } from './api';

export const getPostComments = async (postId: number): Promise<any> => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deletePostComments = async (commentId: number): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' },
  );

  return response.json();
};

export const addComment = async (
  newComment: NewComment,
): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newComment),
    },
  );

  return response.json();
};
