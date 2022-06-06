import { BASE_URL } from './api';
import { Post } from '../types/Post';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const endpoint = userId === 0 ? '/posts' : `/posts?userId=${userId}`;

  const response = await fetch(`${BASE_URL}${endpoint}`);

  const post: Post[] = await response.json();

  return post;
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  const postDetails: Post = await response.json();

  return postDetails;
};
