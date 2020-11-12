import { BASE_URL } from './api';

export const getUserPosts = userId => (
  fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(posts => (+userId !== 0
      ? posts.data.filter(post => post.userId === +userId)
      : posts.data))
);
