export const BASE_URL = 'https://mate-api.herokuapp.com/posts/';

export async function getUserPosts() {
  const response = await fetch(`${BASE_URL}`);

  const result = await response.json();

  return result.data;
}

export async function getPostDetails(url) {
  const response = await fetch(`${BASE_URL}${url}`);

  const result = await response.json();

  return result.data;
}
