import { request } from './api';

export const getComments = (): Promise<Comment[]> => request('/comments');
export const getPostComments = (postId: number) => {
  return getComments()
    .then(comments => comments.filter(comment => comment.postId === postId));
};

export const deleteComment = (commentId: number) => request(`/comments/${commentId}`, { method: 'DELETE' });

export const createComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> => request('/comments', {
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
