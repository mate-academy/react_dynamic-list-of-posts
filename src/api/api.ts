export const BASE_URL = 'https://mate.academy/students-api';

export const getUserPosts = (userId: string) => {
  if (userId === '0') {
    return fetch(`${BASE_URL}/posts`)
      .then(response => response.json());
  }

  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
};

export const getAllUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
};
