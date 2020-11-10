import { BASE_URL, POSTS_URL, request } from './api';

export const getAllPosts = async() => {
  const response = await request(`${BASE_URL}${POSTS_URL}`);

  return response;
};
