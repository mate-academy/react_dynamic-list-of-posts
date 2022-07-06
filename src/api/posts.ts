import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<Post[] | null> => {
  if (userId > 0) {
    return (await fetch(`${BASE_URL}/posts/?userId=${userId}`)).json();
  }

  return (await fetch(`${BASE_URL}/posts`)).json();
};

export const getPostDetails = async (postId: number): Promise<Post | null> => {
  if (postId > 0) {
    return (await fetch(`${BASE_URL}/posts/${postId}`)).json();
  }

  return null;
};
