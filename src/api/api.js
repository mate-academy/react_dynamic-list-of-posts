export const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  const result = await response.json();

  return result.data;
}

export async function getUserPosts(userId) {
  const posts = await getAllPosts();

  return posts.filter(post => post.userId === userId);
}

export async function getPostDetails(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  const post = await response.json();

  return post.data;
}

export async function getPostComments(postId) {
  const response = await fetch(`${BASE_URL}/comments`);

  const comments = await response.json();

  return comments
    .data
    .filter(comment => comment.postId === postId);
}

export function deletePostComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export async function postComment(body) {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });

  const comment = await response.json();

  return comment.data;
}
