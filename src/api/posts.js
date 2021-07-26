import { BASE_URL } from './api';

export const getUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then(posts => posts.data)
  .then(posts => posts
    .filter(post => (userId === 0 ? true : post.userId === userId)));

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json())
  .then(postDetails => postDetails.data);
