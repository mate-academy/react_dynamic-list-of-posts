import { requestOnAPI } from './api';

export const getPostComments = async (postId: number) => {
  return requestOnAPI(`/comments?postId=${postId}`);
};

export const addComment = async (newComment: Comment) => {
  return requestOnAPI('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const deleteComment = async (commentId: number) => {
  return requestOnAPI(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
