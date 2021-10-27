import { request } from './api';

export const getComments = async (postId: number) => {
  const post: Comment[] = await request(`/comments?postId=${postId}`);

  return post;
};

export const removeComment = async (commentId: number) => {
  const result = await request(`/comments/${commentId}`, { method: 'DELETE' });

  return result;
};

export const addComment = async (comment: Partial<Comment>):Promise<Comment> => {
  const data = await request(
    '/comments',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(comment),
    },
  );

  return data;
};
