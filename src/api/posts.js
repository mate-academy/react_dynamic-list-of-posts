/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
import { request } from './api';

export const getUserPosts = (userId) => {
  if (userId === '0') {
    return request(`posts`).then((res) => res.data);
  }

  return request(`posts`).then((res) => {
    return res.data.filter((post) => post.userId === Number(userId));
  });
};

export const getPostDetails = (postId) => {
  return request(`posts/${postId}`).then((res) => res.data);
};

export const getPostComments = (postId) => {
  return request(`comments`).then((res) => {
    return res.data.filter((comment) => comment.postId === postId);
  });
};
