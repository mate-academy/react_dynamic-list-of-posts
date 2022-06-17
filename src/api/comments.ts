import { BASE_URL } from './api';

const request = async (url: string, options = { method: 'GET' }) => {
  return (await fetch(url, options)).json();
};

export async function getPostComments(postId: number) {
  const response = await request(`${BASE_URL}/comments?postId=${postId}`);

  return response;
}

export const removeComment = async (commmentId: number) => {
  await request(`${BASE_URL}/comments/${commmentId}`, { method: 'DELETE' });
};
