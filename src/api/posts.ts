import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const response = userId !== 0
    ? await fetch(`${BASE_URL}/posts?userId=${userId}`)
    : await fetch(`${BASE_URL}/posts`);

  if (response.ok
    && response.headers
      .get('content-type')
      ?.includes('application/json')) {
    return response.json();
  }

  return [];
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (response.ok
    && response.headers
      .get('content-type')
      ?.includes('application/json')) {
    return response.json();
  }

  return {
    id: 0,
    userId: 0,
    body: '',
    title: '',
    createdAt: '',
    updatedAt: '',
  };
};
