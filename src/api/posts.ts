import { BASE_URL } from './api';

type Options = {
  method: string;
  headers?: {} | undefined;
  body?: string | undefined;
};

export const getData = (url: string, options?: Options) => {
  return fetch(`${BASE_URL}${url}`, options).then((response) => response.json());
};

export const getAllPosts = () => {
  return getData('/posts');
};

export const getUserPosts = (userId: number) => {
  return getData(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return getData(`/posts/${postId}`);
};
