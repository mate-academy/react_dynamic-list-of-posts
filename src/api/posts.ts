export const BASE_URL = 'https://mate.academy/students-api';

const addUrl = '/posts?userId=';
const addUrlForAllUsers = '/posts';

export async function getUserPosts(userId: string): Promise<never[]> {
  const endPoint = `${BASE_URL}${
    (userId === '0')
      ? addUrlForAllUsers
      : addUrl + userId
  }`;

  // eslint-disable-next-line no-console
  console.log('userId:', userId, 'endPoint:', endPoint);

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
