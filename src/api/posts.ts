import { getData } from './api';

export const getPosts = (userId: number) => {
  let endpoint = 'posts/';

  if (userId) {
    endpoint += `?userId=${userId}`;
  }

  return getData<Post[]>(endpoint);
};

export const getPostDetails = (postId: number) => {
  return getData<Post>(`posts/${postId}`);
};
