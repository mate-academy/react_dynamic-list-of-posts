const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data);

export const getAllPosts = () => request(`/posts`);

export const getUserPosts = async(userId) => {
  const result = await request(`/posts?userId=${userId}`);

  return result;
};

export const getPostDetails = async(postId) => {
  const result = await request(`/posts/${postId}`);

  return result;
};
