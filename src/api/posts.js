import { BASE_URL } from './api';

export const getUserPosts = (userId = '', url) => (
  fetch(`${BASE_URL}${url}${userId}`)
    .then(a => a.json()).then(b => b.data));
