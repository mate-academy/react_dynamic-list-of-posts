import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    let response;

    if (userId === 0) {
      response = await fetch(`${BASE_URL}/posts`);
    } else {
      response = await fetch(`${BASE_URL}/posts?userId=${String(userId)}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error');
  }
};

export const getSelectedPost = async (postId: number): Promise<Post> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${String(postId)}`);

    return await response.json();
  } catch (error) {
    throw new Error('Error');
  }
};
