import { requestOnAPI } from './api';

export const getPostComments = (postId: number) => {
  return requestOnAPI(`/comments?postId=${postId}`);
};

export const addComment = async (newComment: Partial<Comment>) => {
  const responseAPI = await requestOnAPI('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });

  return responseAPI;
};

export const deleteComment = (commentId: number) => {
  return requestOnAPI(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
