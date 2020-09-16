const API_URL = 'https://mate-api.herokuapp.com';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${API_URL}/posts`);

  const result = await response.json();

  if (userId) {
    return result.data.filter(post => post.userId === userId);
  }

  return result.data;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}`);
  const result = await response.json();

  return result.data;
};
