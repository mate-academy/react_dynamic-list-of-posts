import { request } from './api';

export const getUserPosts = (userId, setPosts) => {
  if (!userId) {
    request(`/posts`)
      .then(result => setPosts(result));
  } else {
    request(`/posts?userId=${userId}`)
      .then(result => setPosts(result));
  }
};

export const getPostDetails = (postId) => {
  if (!postId) {
    return 0;
  }

  return request(`/posts/${postId}`);
};
