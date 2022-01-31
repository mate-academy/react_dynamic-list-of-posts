import { BASE_URL } from './api';

export const getUserPosts = (userId: string) => {
  if (userId === '0') {
    return fetch(BASE_URL).then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
  }

  return fetch(`${BASE_URL}?userId=${userId}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/${postId}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};
