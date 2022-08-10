export const BASE_URL = 'https://mate.academy/students-api';

// /posts?userId=4
const addUrl = '/posts?userId=';

export async function getUserPosts(userId: number): Promise<Single> {
  // eslint-disable-next-line no-console
  console.log(`${BASE_URL}${addUrl}`);

  const response = await fetch(`${BASE_URL}${addUrl}${userId}`);

  //  eslint-disable-next-line no-console
  console.log('response', response);

  if (!response.ok) {
    throw new Error('error');
  }

  if (!response.headers.get('content-type')?.includes('application/json')) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Content type is not supported');
  }

  return response.json();
}
