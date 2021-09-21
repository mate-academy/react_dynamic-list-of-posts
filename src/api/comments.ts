/* eslint-disable no-console */
export const getPostComments = async (postId: number) => {
  const ending = `?postId=${postId}`;
  const response = await fetch(`https://mate.academy/students-api/comments${ending}`);

  if (!response.ok) {
    throw new Error('Error: invalid reference');
  }

  return response.json();
};

type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
};

export const handleMethodRequest = async (comment: Comment, method: string) => {
  const deleteRequest = `https://mate.academy/students-api/comments/${comment.id}`;
  const postRequest = 'https://mate.academy/students-api/comments';

  await fetch(method === 'POST' ? postRequest : deleteRequest, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
};
