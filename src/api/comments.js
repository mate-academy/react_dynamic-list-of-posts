const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getPostComments(postId) {
  const response = await fetch(`${BASE_URL}/comments`);
  const data = await response.json();
  const comments = await data.data;

  return comments.filter(comment => comment.postId === postId);
}
