export const BASE_URL = 'https://mate.academy/students-api';

const addUrl = '/comments?postId=';

export async function getPostComments(postId: string): Promise<never[]> {
  const endPoint = `${BASE_URL}${addUrl}${postId}`;

  // eslint-disable-next-line no-console
  console.log('postId:', postId, 'endPoint:', endPoint);

  const response = await fetch(endPoint);

  if (!response.ok) {
    throw new Error('error');
  }

  if (!response.headers.get('content-type')?.includes('application/json')) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Content type is not supported');
  }

  return response.json();
}
