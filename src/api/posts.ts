import { ENDPOINTS, request } from './api';
import { Post } from '../types/Post';
import { ResponseError } from '../types/ResponseError';

export const getUserPosts = (userId: number) => {
  const query = userId ? `${ENDPOINTS.posts}?userId=${userId}` : `${ENDPOINTS.posts}`;

  return request<Post[] | ResponseError>(query);
};

export const getPostDetails = (postId: number) => (
  request<Post | ResponseError>(`${ENDPOINTS.posts}/${postId}`)
);
