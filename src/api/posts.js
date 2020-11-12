import { BASE_URL } from './api';

export const getUserPosts = async(id) => {
  let response;

  if (id === 0) {
    response = await fetch(`${BASE_URL}/posts`);
  } else {
    response = await fetch(`${BASE_URL}/posts/${id}`);
  }

  const { data } = await response.json();

  return data;
};
