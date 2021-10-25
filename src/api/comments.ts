import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const userPosts = await response.json();

  return userPosts.filter((comment: Comment) => comment.postId === postId);
};

export const addComment = async (newComment: Partial<Comment>) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  };
  const response = await fetch(`${BASE_URL}/comments`, options);

  return response;
};

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });

  return response;
};
