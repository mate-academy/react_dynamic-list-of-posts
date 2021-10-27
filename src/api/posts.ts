import { request } from './api';

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const requestUrl = userId ? `/posts?userId=${userId}` : '/posts';

  const posts = await request(requestUrl);

  return posts;
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const postDetails = await request(`/posts/${postId}`);

  return postDetails;
};
