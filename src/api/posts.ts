const BASE_URL = 'https://mate.academy/students-api/';

export const getUserPosts = async (userId: number) => {
  try {
    const endpoint = userId === 0 ? 'posts/' : `posts?userId=${userId}`;
    const serverResponse = await fetch(`${BASE_URL}${endpoint}`);
    const posts = await serverResponse.json();

    return posts;
  } catch (error) {
    throw new Error(`Fetch failed: ${error}`);
  }
};

export const getPostDetails = async (postId: number) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}posts/${postId}`);
    const post = await serverResponse.json();

    return post;
  } catch (error) {
    throw new Error(`Fetch failed: ${error}`);
  }
};
