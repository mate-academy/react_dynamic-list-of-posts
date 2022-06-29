import { NewComment } from '../react-app-env';
import { BASE_URL } from './api';

export const getPostComments = async (postId:number) => {
  const responst = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return responst.json();
};

export const deleteComment = async (commentId:number) => {
  await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = async (obj:NewComment) => {
  await fetch(`${BASE_URL}/comments`,
    {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
};
