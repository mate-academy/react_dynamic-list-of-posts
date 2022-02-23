const BASE_URL = 'https://mate.academy/students-api/posts';

export const getPosts = async () => {
  try {
    const response = await fetch(BASE_URL);

    return await response.json();
  } catch (error) {
    throw new Error(`${error}: some problems with server`);
  }
};

export const getUserPosts = async (userId: number) => {
  if (!userId) {
    return getPosts();
  }

  const response = await fetch(`${BASE_URL}?userId=${userId}`);

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  if (!postId) {
    return [];
  }

  const response = await fetch(`${BASE_URL}/${postId}`);

  return response.json();
};
