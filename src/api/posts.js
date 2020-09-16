const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getPosts(id) {
  const response = await fetch(`${BASE_URL}/posts`);
  const result = await response.json();
  const posts = await result.data;

  if (id) {
    return posts.filter(post => post.userId === +id);
  }

  return posts;
}

export async function getPostDetails(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const result = await response.json();

  return result.data;
}
