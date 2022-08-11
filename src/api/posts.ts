import { Posts } from '../types/Posts';
import { Post } from '../types/Post';

export const BASE_URL = 'https://mate.academy/students-api/';

export const getUserPosts = async (userSelect: number): Promise<Posts> => {
  const result: Posts = {
    responseError: {
      error: null,
      message: null,
    },
    data: null,
  };

  const res = await fetch(userSelect === 0
    ? (`${BASE_URL}posts`)
    : `${BASE_URL}posts?userId=${userSelect}`);

  if (!res.ok) {
    result.responseError.error = 'error';
    result.responseError.message = `${res.status} ${res.statusText}`;
  } else {
    result.data = await res.json();
  }

  return result;
};

export const getPostDetails = async (id: number): Promise<Post> => {
  const result: Post = {
    responseError: {
      error: null,
      message: null,
    },
    data: null,
  };

  const res = await fetch(`${BASE_URL}posts/${id}`);

  if (!res.ok) {
    result.responseError.error = 'error';
    result.responseError.message = `${res.status} ${res.statusText}`;
  } else {
    result.data = await res.json();
  }

  return result;
};
