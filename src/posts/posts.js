const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts`);

  const result = await response.json();

  return userId
    ? result.data.filter(elem => elem.userId === userId)
    : result.data;
}

export async function getPostDetails(postId) {
  const response = await fetch(`${BASE_URL}/posts/${+postId}`);

  const result = await response.json();

  return result.data;
}
