import { BASE_URL } from './api';

export const getAllPosts = async (url:string):Promise<Post[]> => {
  const response = await fetch(`${url}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const posts = await response.json();

  return posts;
};

export const getUserPosts = async (userId: number):Promise<Post[]> => {
  const userPosts = await getAllPosts(`${BASE_URL}?userId=${userId}`);

  return userPosts;
};

export const getPostDetails = async (postId: number):Promise<Post | null> => {
  if (postId !== 0) {
    const response = await fetch(`${BASE_URL}/${postId}`);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const post = await response.json();

    return post;
  }

  return null;
};
