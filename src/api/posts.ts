/* eslint-disable no-console */
/* eslint-disable max-len */
export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }

  return res.json();
};

// function wait(delay) {
//   return new Promise(resolve => setTimeout(resolve, delay));
// }

export const getPosts = async () => {
  return request('/posts');
};

export const getUsers = async () => {
  return request('/users');
};

export const getUserPosts = (userId: number) => {
  return request(`/posts/${userId}`);
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};
