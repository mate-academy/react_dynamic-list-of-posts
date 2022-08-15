export const BASE_URL = 'https://mate.academy/students-api';

// const request = (url: string): Promise<never[]> => {
//   return fetch(`${BASE_URL}${url}`)
//     .then(response => {
//       if (!response.ok) {
//         // eslint-disable-next-line @typescript-eslint/no-throw-literal
//         throw `${response.status} - ${response.statusText}`;
//       }

//       return response.json();
//     });
// };

// export const getUserPosts = (userId: string) => {
//   const endPoint = `${
//     (userId === '0')
//       ? '/posts'
//       : `/posts?userId=${userId}`
//   }`;

//   return request(endPoint);
// };

export async function getUserPosts(userId: string): Promise<never[]> {
  const addUrl = '/posts?userId=';
  const addUrlForAllUsers = '/posts';

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

export async function getPostDetails(postId: string): Promise<Post> {
  const addUrl = '/posts/';
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
