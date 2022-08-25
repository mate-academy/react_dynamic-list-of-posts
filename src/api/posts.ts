/* eslint-disable no-cond-assign */
export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options: any = {}) => {
  // eslint-disable-next-line no-console
  console.log(`${BASE_URL}${url}`, options);

  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(
      `${response.status} - ${response.statusText}`,
    );
  }

  if (!response.headers.get('content-type')?.includes('application/json')) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Content-type is not supported');
  }

  return response.json();
};

export const getUserPosts = (userId: string) => request(
  (userId === 'All') ? '/posts' : `/posts?userId=${userId}`,
);

export const getPostDetails = (postId: string) => request(`/posts/${postId}`);

// export async function getUserPosts(userId: string): Promise<never[]> {
//   const addUrl = '/posts?userId=';
//   const addUrlForAllUsers = '/posts';

//   const endPoint = `${BASE_URL}${
//     (userId === '0')
//       ? addUrlForAllUsers
//       : addUrl + userId
//   }`;

//   // eslint-disable-next-line no-console
//   console.log('userId:', userId, 'endPoint:', endPoint);

//   const response = await fetch(endPoint);

//   if (!response.ok) {
//     throw new Error('error');
//   }

//   if (!response.headers.get('content-type')?.includes('application/json')) {
//     // eslint-disable-next-line prefer-promise-reject-errors
//     return Promise.reject('Content type is not supported');
//   }

//   return response.json();
// }

// export async function getPostDetails(postId: string): Promise<Post> {
//   const addUrl = '/posts/';
//   const endPoint = `${BASE_URL}${addUrl}${postId}`;

//   // eslint-disable-next-line no-console
//   console.log('postId:', postId, 'endPoint:', endPoint);

//   const response = await fetch(endPoint);

//   if (!response.ok) {
//     throw new Error('error');
//   }

//   if (!response.headers.get('content-type')?.includes('application/json')) {
//     // eslint-disable-next-line prefer-promise-reject-errors
//     return Promise.reject('Content type is not supported');
//   }

//   return response.json();
// }
