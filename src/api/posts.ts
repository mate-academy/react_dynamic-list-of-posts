import { request } from './api';

export const getUserPosts = (userId: number) => {
  const query = userId !== 0
    ? `/posts?userId=${userId}`
    : '/posts';

  return request(query);
};
