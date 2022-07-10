import { BASE_URL } from './api';
import { Post } from '../react-app-env';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const path = userId === 0 ? '/posts' : `/posts?userId=${userId}`;
  const userPosts = await fetch(`${BASE_URL}${path}`);

  return userPosts.json();
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const postDetails = await fetch(`${BASE_URL}/posts/:${postId}`);

  return postDetails.json();
};
