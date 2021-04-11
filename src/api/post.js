import { request } from './api';

const BASE_URL = 'https://mate-api.herokuapp.com';

export const getUserPosts = postId => request(`/posts/${postId}`)
  .then(result => result.data);

export const getPosts = postsRequest => request(`${postsRequest}`)
  .then(result => result.data);

export const getComments = postId => request(`/comments`)
  .then(result => result.data)
  .then(comments => comments.filter(comment => comment.postId === postId));

export const removeComment = (postId) => {
  fetch(`${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  });
};

export const postComment = (bodyData) => {
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Context-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(bodyData),
  });
};
