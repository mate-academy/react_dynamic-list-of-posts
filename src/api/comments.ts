import { NewComment } from '../types/NewComment';

const BASE_URL = 'https://mate.academy/students-api';

export const getComments = async (postId: number) => {
  const URL = `${BASE_URL}/comments?postId=${postId}`;

  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  return result;
};

export const deleteComment = async (id: number) => {
  const URL = `${BASE_URL}/comments/${id}`;

  const res = await fetch(URL, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res;
};

export const postComment = async (newComment: NewComment) => {
  const URL = `${BASE_URL}/comments`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  };

  const res = await fetch(URL, options);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  return result;
};
