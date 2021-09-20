import { requestOnAPI } from './api';

export const getPosts = async () => {
  return requestOnAPI('/posts');
};

export const getUserPosts = async (userId: number) => {
  return requestOnAPI(`/posts?userId=${userId}`);
};

export const getPostDetails = async (postId: number) => {
  return requestOnAPI(`/posts/${postId}`);
};
