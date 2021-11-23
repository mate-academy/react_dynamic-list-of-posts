import { BASE_URL } from './api';
import { request } from './posts';

export const getPostComments = async (postId: number) => {
  const commentsFromServer: Comment[] = await request(`${BASE_URL}/comments`);

  const postComments = commentsFromServer.filter(comment => comment.postId === postId);

  return postComments;
};

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const createComment = async (commentBody: CommentBody) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(commentBody),
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
};
