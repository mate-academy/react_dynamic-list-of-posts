import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = userId === 0
    ? await fetch(`${BASE_URL}/posts`)
    : await fetch(`${BASE_URL}/posts?userId=${userId}`);

  const body = await response.json();

  return body.data;
};

export const get30Users = async() => {
  const response = await fetch(`${BASE_URL}/users`);

  const body = await response.json();

  const people = body.data.filter(
    (user, index) => index < 30 && user.name,
  );

  return people;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const body = await response.json();

  return body.data;
};
