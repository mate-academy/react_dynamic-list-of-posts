import { Post } from '../types/Post';
import { ResponseError } from '../types/ResponseError';
import { request, ENDPOINT } from './api';

// eslint-disable-next-line max-len
export const getUserPosts = (userId = 0): Promise<Post[] | ResponseError> => {
  const url = userId === 0
    ? `${ENDPOINT.posts}`
    : `${ENDPOINT.posts}?userId=${userId}`;

  return request(url, 'Posts is not load');
};

// eslint-disable-next-line max-len
export const getPostDetails = (postId: number): Promise<Post | ResponseError> => {
  return request(`${ENDPOINT.posts}/${postId}`, 'Post did not find');
};
