export const BASE_URL = 'https://mate.academy/students-api';

export const getPosts = () => (
  fetch(`${BASE_URL}/posts`)
    .then(response => {
      if (!response.ok) {
        return new Error('Can\'t find source');
      }

      return response.json();
    })
);

export const getPostDetails = (postId: string) => (
  fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        return new Error('Can\'t find source');
      }

      return response.json();
    })
);
