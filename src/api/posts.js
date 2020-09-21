const POSTS_URL = 'https://mate-api.herokuapp.com/posts';

async function request(path) {
  const response = await fetch(path);
  const result = await response.json();

  return result.data;
}

export function getUserPosts() {
  return request(POSTS_URL);
}

export function getPostDetails(postId) {
  return request(`${POSTS_URL}/${postId}`);
}
