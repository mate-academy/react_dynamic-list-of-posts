import { request } from './posts';

export const getComments = (postId: number): Promise<Comment[]> => {
  return request(`/comments?postId=${postId}`);
};

export const postNewComment = (newComment: Partial<Comment>) => {
  return request('/comments', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
