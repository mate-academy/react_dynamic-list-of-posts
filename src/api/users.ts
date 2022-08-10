export const BASE_URL = 'https://mate.academy/students-api';

// /posts?userId=4
const addUrl = '/posts/';

export async function getUsers() {
  // eslint-disable-next-line no-console
  console.log(`${BASE_URL}${addUrl}`);

  const response = await fetch(`${BASE_URL}${addUrl}`);

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

// const BASE_URL = 'https://mate.academy/students-api';
// const addUrl = '/posts/';

// async function getUserPosts() {
//   // eslint-disable-next-line no-console
//   console.log(`${BASE_URL}${addUrl}`);

//   const response = await fetch(`${BASE_URL}${addUrl}`);

//   //  eslint-disable-next-line no-console
//   console.log('response', response);

//   return response.json();
// }

// getUserPosts()
//     .then(response => response.map(i => i.name))
//     .then(i => new Set(i))
//     .then(i => console.log(i));
