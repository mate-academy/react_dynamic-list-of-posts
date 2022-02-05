import { request } from './api';

export const getPosts = (userId: number) => {
  let endpoint = 'posts/';

  if (userId) {
    endpoint += `?userId=${userId}`;
  }

  return request<Post[]>(endpoint);
};

export const getPostDetails = (postId: number) => {
  return request<Post>(`posts/${postId}`);
};
