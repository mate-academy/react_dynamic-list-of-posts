import { request } from './api';

export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getUserPosts2 = (userId) => {
  const getPosts = () => {
    request(`/posts`);
  };

  getPosts()
    // eslint-disable-next-line no-console
    .then(posts => console.log(posts));
};

export async function getUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts/`);
  const result = await response.json();

  return result;
}
