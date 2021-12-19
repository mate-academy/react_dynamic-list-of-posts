import { request } from './api';
import { Comment } from '../types/comment';

export const getComments = async (postId:number) => {
  const comments = await request('/comments', { method: 'GET' });

  return comments.filter((comment: { postId: number; }) => comment.postId === postId);
};

export const deleteComment = (commentId: number) => {
  const options = {
    method: 'DELETE',
  };

  return request(`/comments/${commentId}`, options);
};

export const postComment = (comment: Comment) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
};
