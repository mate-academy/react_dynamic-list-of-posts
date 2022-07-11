/* eslint-disable no-console */
import { BASE_URL } from './api';

export const getUserPosts = (id: number) => {
  let link = '';

  if (id === 0) {
    link = '/posts';
  } else {
    link = `/posts?userId=${id}`;
  }

  return fetch(`${BASE_URL}${link}`)
    .then(resp => (
      resp.ok
        ? resp.json()
        : Promise.reject(new Error(`${resp.status}: ${resp.statusText}`))
    ))
    .catch(err => console.log(err));
};

export const getPostDetails = (postId: number) => (
  fetch(`${BASE_URL}/posts/${postId}`)
    .then(resp => (
      resp.ok
        ? resp.json()
        : Promise.reject(new Error(`${resp.status}: ${resp.statusText}`))
    ))
    .catch(err => console.log(err))
);
