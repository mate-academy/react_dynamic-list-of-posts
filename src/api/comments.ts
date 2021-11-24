import { BASE_URL, request } from './api';

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const commentsFromServer: Comment[] = await request(`${BASE_URL}/comments`);

  return commentsFromServer.filter(comment => comment.postId === postId);
};

export const deleteComment = async (commentId: number): Promise<Comment> => {
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

  return response.json();
};
