import { request } from './api';

export const getUserPosts = (userId?: number) => {
  if (userId === undefined || userId === 0) {
    return request('/posts');
  }

  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  const result = request(`/posts/${postId}/`);

  if (!result) {
    return {
      id: 0,
      userId: 0,
      title: '',
      body: '',
    };
  }

  return result;
};
