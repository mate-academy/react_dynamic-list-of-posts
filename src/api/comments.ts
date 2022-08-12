import { request } from './api';

export const getPostComments = async (postId: number) => {
  const comments = await request(`/comments?postId=${postId}`);

  return comments;
};

export const deleteComment = async (commentId: number) => {
  const deleteResult
  = await request(`/comments/${commentId}`, { method: 'DELETE' });

  return deleteResult;
};

export const addComment
= async (postId: number, userName: string, email: string, text: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name: userName,
      email,
      body: text,
    }),
  };

  try {
    const addResult
    = await request('/comments', options);

    return addResult;
  } catch {
    throw new Error();
  }
};
