export const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  return (await response.json()).data;
}

export async function getUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = (await response.json()).data;

  if (!userId) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
}

export async function getPostDetails(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return (await response.json()).data;
}

export async function getPostComments(postId) {
  const response = await fetch(`${BASE_URL}/comments`);
  const { data } = await response.json();

  return data.filter(comment => comment.postId === postId);
}

export async function deleteComment(commentId) {
  await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export async function addComment(comment) {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
