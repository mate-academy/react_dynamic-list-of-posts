import { request } from './api';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return request(`/comments?postId=${postId}`);
};

export const deleteCommentFromServer = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addCommentOnServer = (newComment: Partial<Comment>) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};
