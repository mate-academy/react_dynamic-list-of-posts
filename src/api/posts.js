import { request } from './api';

export const getUserPosts = (posts, userId) => {
  if (!userId) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = (postId) => {
  if (!postId) {
    return 0;
  }

  return request(`/posts/${postId}`);
};
