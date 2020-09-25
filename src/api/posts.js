import { BASE_URL } from './api';

export const GetUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then(user => (userId === 0
    ? user.data
    : user.data.filter(post => post.userId === userId)));
