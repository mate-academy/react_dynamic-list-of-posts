import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const url = `${BASE_URL}/comments?postId=${postId}`;
  const response = await fetch(url);

  return response.json();
};

export const postComment = async (
  postId: number,
  nameForComment: string,
  emailForComment: string,
  bodyForComment: string,
) => {
  const data = {
    postId,
    name: nameForComment,
    email: emailForComment,
    body: bodyForComment,
  };
  const url = 'https://mate.academy/students-api/comments';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteComment = async (postId: string) => {
  const url = `https://mate.academy/students-api/comments/${postId}`;

  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
