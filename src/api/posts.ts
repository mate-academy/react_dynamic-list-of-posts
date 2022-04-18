import { request } from './api';
import { Post } from '../types/Post';

export const getUserPosts = (userId: number): Promise<Post[]> => {
  let response;

  if (!userId) {
    response = 'posts';
  } else {
    response = `posts?userId=${userId}`;
  }

  return request(response);
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`posts/${postId}`);
};
