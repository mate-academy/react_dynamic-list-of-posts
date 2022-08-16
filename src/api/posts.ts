import { BASE_URL } from './api';

export const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(result => result.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(result => result.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const getComments = () => {
  return fetch(`${BASE_URL}/comments`)
    .then(result => result.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const getUserPosts = (userId: number) => {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(result => result.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(result => result.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(result => result.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const deleteComments = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(result => result.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const addComments
  = (name: string, email: string, body: string,
    id: () => Promise<number>, postId: number) => {
    return fetch(`${BASE_URL}/comments/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id,
        postId,
        name,
        email,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    })
      .then(result => result.json())
      .catch(() => ({
        Response: 'False',
        Error: 'unexpected error',
      }));
  };
