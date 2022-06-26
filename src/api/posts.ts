import { BASE_URL } from './api';

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return fetch(`${BASE_URL}/posts${userId === 0 ? '' : `?userId=${userId}`}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error!!!');
      }

      return response.json();
    });
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Shit! ');
      }

      return response.json();
    });
};
