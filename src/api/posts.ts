import { BASE_URL } from './api';

export const getUserPosts = (userId: number): Promise<Post[] | null> => {
  if (userId) {
    return fetch(`${BASE_URL}/posts/?userId=${userId}`)
      .then(promise => promise.json());
  }

  return fetch(`${BASE_URL}/posts`)
    .then(promise => promise.json());
};
