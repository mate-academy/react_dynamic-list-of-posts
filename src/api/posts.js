import { BASE_URL } from './api';

export async function getUserPosts(userId) {
  try {
    const response = await fetch(`${BASE_URL}/posts/`);
    const allPosts = await response.json();

    return allPosts.data.filter(post => !+userId || post.userId === +userId);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);

    return error;
  }
}

export async function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(response => response.data)
    .catch(
      // eslint-disable-next-line
      error => console.error(error)
    );
}
