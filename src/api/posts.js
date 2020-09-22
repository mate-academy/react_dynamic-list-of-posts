const BASE_URL = 'https://mate-api.herokuapp.com/posts/';

export const getUserPosts = async(userId) => {
  const response = await fetch(BASE_URL);
  const userPosts = await response.json();

  if (userId === 0) {
    return userPosts.data;
  }

  return userPosts.data.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}${postId}`);
  const postDetails = await response.json();

  return postDetails.data;
};
