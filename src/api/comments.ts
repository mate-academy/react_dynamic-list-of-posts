import { requeste } from './api';

export const getPostComments = () => requeste('/comments/');

export const deletePostComment = (commentId: number) => requeste(`/comments/${commentId}`, { method: 'DELETE' });

export const addNewComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => requeste(`/comments?postId=${postId}`,
  {
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
  });
