import { request } from './api';

export const getUserPosts = userId => request('posts')
  .then(result => result.filter(post => (
    userId ? post.userId === userId : post
  )));

export const getPostDetails = postId => request('posts', postId)
  .then(result => result);
