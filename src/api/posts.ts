import { apiRequest } from './api';

export const getUserPosts = (userId: number) => {
  const userPostsUrl = (userId > 0)
    ? `posts?userId=${userId}`
    : 'posts';

  return apiRequest(userPostsUrl);
};

export const getPostsDetails = (id: number) => {
  return apiRequest(`posts/${id}`);
};
