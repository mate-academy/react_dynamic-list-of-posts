export const BASE_URL = 'https://mate.academy/students-api';

export const getUserPosts = (userId: number) => {
  return userId
    ? fetch(`${BASE_URL}/posts/?userId=${userId}`)
      .then(response => response.json())
    : fetch(`${BASE_URL}/posts/`)
      .then(response => response.json());
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
};

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
};
