import { BASE_URL } from './api';

export const getUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then(result => result.data)
  .then(posts => (
    userId === 0
      ? posts
      : posts.filter(post => post.userId === userId)
  ))
  .catch(error => `Oooops...${error}`);

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json())
  .then(result => result.data)
  .then(post => post)
  .catch(error => `Oooops...${error}`);
