import { BASE_URL, request } from './api';

export const getPostDetails = postId => request(`${BASE_URL}/posts/${postId}`)
  .then(result => result.data);
