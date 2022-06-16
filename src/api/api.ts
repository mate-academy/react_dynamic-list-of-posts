import { NewPostBody } from '../types/Post';

export const BASE_URL = 'https://mate.academy/students-api';

export async function getAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
}

export async function getUserPosts(userId: number) {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    const data = await response.json();

    if (!data) {
      throw new Error('Dont find this user');
    }

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
}

export async function getPostDetails(postId: number) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    const data = await response.json();

    if (!data) {
      throw new Error('Dont find this user');
    }

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
}

export async function getPostComments(postId: number) {
  try {
    // eslint-disable-next-line
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
    const data = await response.json();

    if (!data) {
      throw new Error('Dont find this comments');
    }

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
}

export async function removeComment(commentId: number) {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
}

export async function postNewComment(preparedData: NewPostBody) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(preparedData),
  });
}
