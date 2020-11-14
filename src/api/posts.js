/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import { request } from './api';

export const getUserPosts = (userId) => {
  if (userId === '0') {
    return request(`posts`).then((res) => res.data);
  }

  return request(`posts`).then((res) =>
    res.data.filter((post) => post.userId === Number(userId))
  );
};

export const getPostDetails = (postId) =>
  request(`posts/${postId}`).then((res) => res.data);

export const getPostComments = (postId) =>
  request(`comments`).then((res) =>
    res.data.filter((comment) => comment.postId === postId)
  );
