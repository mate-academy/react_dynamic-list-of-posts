import { BASE_URL } from './api';
import { Comment, NewComment } from '../react-app-env';

export const getPostComments = async (postId:number): Promise<Comment[]> => {
  const postComments = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return postComments.json();
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = async (comment: NewComment):Promise<Comment> => {
  const newComment = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });

  return newComment.json();
};
