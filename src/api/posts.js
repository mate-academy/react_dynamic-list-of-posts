import { request } from './api';

export const getUserPosts = (userId) => {
  const promise = request('/posts');

  if (userId === 0) {
    return promise;
  }

  return promise
    .then(posts => posts.filter(
      post => post.userId === userId,
    ));
};

export const getPostDetails = postId => request(`/posts/${postId}`);
