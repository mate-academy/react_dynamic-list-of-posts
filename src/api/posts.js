const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  const posts = await data.data;

  if (userId === '0') {
    return posts;
  }

  return posts.filter(post => post.userId === +userId);
}

export async function getPostDetails(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const data = await response.json();
  const post = await data.data;

  return post;
}
