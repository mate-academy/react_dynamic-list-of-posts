const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getUserPosts(userId) {
  const posts = await fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(result => result.data);

  if (userId === 0) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
}

export async function getPostDetails(postId) {
  const data = await fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(result => result.data);

  return data;
}
