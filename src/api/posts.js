import { BASE_URL } from './api';

export const getUserPosts = (userId) => {
  const fetchedData = fetch(`${BASE_URL}/posts/`)
    .then(response => response.json())
    .then((result) => {
      if (userId !== 0) {
        return result.data.filter(post => post.userId === +userId);
      }

      return result.data;
    });

  return fetchedData;
};

export const getPostDetails = (postId) => {
  const fetchedData = fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(result => result.data);

  return fetchedData;
};
