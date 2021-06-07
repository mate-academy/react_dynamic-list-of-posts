import { request } from './api';

export const getUserPosts = (userId) => {
  const postsFromServer = request(`/posts`);

  if (userId === 0) {
    return postsFromServer;
  }

  return postsFromServer
    .then(posts => posts.filter(post => post.userId === userId));
};

export const getPostDetails = postId => request(`/posts/${postId}`);
