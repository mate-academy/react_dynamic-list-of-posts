export const BASE_URL = 'https://mate.academy/students-api';

// /posts?userId=4
const addUrl = '/posts?userId=';
const addUrlForAllUsers = '/posts';

export async function getUserPosts(userId: number): Promise<Single> {
  const endPoint = `${BASE_URL}${userId ? addUrl + userId : addUrlForAllUsers}`;

  // eslint-disable-next-line no-console
  console.log(endPoint);

  const response = await fetch(endPoint);

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
