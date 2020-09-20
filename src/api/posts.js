const POSTS_URL = 'https://mate-api.herokuapp.com/';

async function request(path) {
  const response = await fetch(`${POSTS_URL}${path}`);
  const result = await response.json();

  return result.data;
}

export function getUserPosts() {
  return request(`posts`);
}

export function getPostDetails(postId) {
  return request(`posts/${postId}`);
}
