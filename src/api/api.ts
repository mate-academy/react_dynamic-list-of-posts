export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getUserPosts(userId: number) {
  let response;

  if (userId === 0) {
    response = await fetch(`${BASE_URL}/posts`);
  } else {
    response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  }

  return response.json();
}

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
}

export async function getPost(postId: number) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
}

export async function getComments(postId: number) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
}
