import { BASE_URL } from './api';

export const getUserPosts = async(userId = 0) => {
  let result;

  await fetch(
    `${BASE_URL}/posts${userId ? `?userId=${userId}` : ''}`,
  )
    .then(response => response.json())
    .then((response) => {
      result = [...response.data];
    });

  return result;
};

export const getPostComments = async(postId) => {
  let result;

  await fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json())
    .then((response) => {
      result = [...response.data];
    });

  return result;
};

export const getPostDetails = async(id) => {
  let result;

  await fetch(`${BASE_URL}/posts/${id}`)
    .then(response => response.json())
    .then((response) => {
      result = response.data;
    });

  return result;
};

export const addComment = async(data) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      ...data,
    }),
  });
};

export const deleteComment = async(id) => {
  await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
};
