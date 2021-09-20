import { requestOnAPI } from './api';

export const getPosts = () => {
  return requestOnAPI('/posts');
};

export const getUserPosts = (userId: number) => {
  return requestOnAPI(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return requestOnAPI(`/posts/${postId}`);
};
