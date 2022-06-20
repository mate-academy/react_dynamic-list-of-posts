import { BASE_URL, allPostEndpoint } from './api';
import { Comment } from '../types/Comment';

export const request = (url: string, options?: {
  method: string, headers?: any, body?: string
}) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}-${response.statusText}`);
      }

      return response.json();
    });
};

export const removeFromServer = (url: string) => {
  return request(url, { method: 'DELETE' });
};

export const addComment = (url: string, data: Comment) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const getUserPosts = (user: number) => {
  const selectEndpoint = (user !== 0)
    ? `${allPostEndpoint}?userId=${user}`
    : allPostEndpoint;

  return request(selectEndpoint);
};

export const getUsers = (name?: string | undefined) => {
  const selectEndpoint = (name)
    ? `/users?username=${name}`
    : '/users';

  return request(selectEndpoint);
};
