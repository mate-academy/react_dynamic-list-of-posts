const BASE_URL = 'https://mate.academy/students-api/posts';

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}${userId}`);

  if (!response.ok) {
    return Promise.reject(new Error('Error'));
  }

  return response.json();
};

export const getUserPost = async (userId: string): Promise<Post> => {
  const response = await fetch(`${BASE_URL}${userId}`);

  if (!response.ok) {
    return Promise.reject(new Error('Error'));
  }

  return response.json();
};
