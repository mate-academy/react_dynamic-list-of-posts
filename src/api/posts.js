import { BASE_URL } from './api';

export const getUserPosts = userId => fetch(`${BASE_URL}/posts/`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then((postsFromServer) => {
    if (userId === 'All') {
      return postsFromServer.data;
    }

    return postsFromServer.data.filter(post => post.userId === +userId);
  });

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  }).then(postFromServer => postFromServer.data);
