import { request } from './api';

export const getUserPosts = userId => request('posts')
  .then(result => result
    .filter(res => (+userId ? res.userId === +userId : res)));

export const getPostDetails = postId => (
  request(`posts/${postId}`));
