import { request } from './api';

export const getUserPosts = async (userId = 0) => {
  let endpoint = '/posts';

  if (userId !== 0) {
    endpoint += `?userId=${userId}`;
  }

  const posts = await request(endpoint);

  return posts;
};

export const getPost = async (postId: number) => {
  const post: Post[] = await request(`/posts?id=${postId}`);

  return post;
};
