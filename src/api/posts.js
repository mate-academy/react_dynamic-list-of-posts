import { BASE_URL } from './api';

export const getUserPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();

  return data;
};

export const createPost = async() => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId: 3,
      body: 'Lorem ipsum dolor sit amet',
      title: 'Lorem ipsum dolor, adipisicing elit. Sint, a?',
    }),
  });
  const data = await response.json();

  return data;
};

// createPost();
