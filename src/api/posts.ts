import { request } from './api';

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const urlForRequest = userId === '' || userId === '0'
    ? '/posts'
    : `/posts?userId=${userId}`;
  const posts = await request(urlForRequest);

  return posts;
};

export const getPost = async (id: string): Promise<Post> => {
  const urlForRequest = `/posts/${id}`;
  const post = await request(urlForRequest);

  return post;
};
