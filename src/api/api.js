/* eslint-disable arrow-body-style */
export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getPosts = (selectedUserId) => {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(movies => movies.data.filter((movie) => {
      return selectedUserId === 0
        ? true
        : movie.userId === selectedUserId;
    }));
};

export const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
};

export const getPostDetails = (postId) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
};

export const getPostComments = (postId) => {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(comments => comments.data
      .filter(comment => comment.postId === postId));
};

export const addNewComment = (newComment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
  });
};

export const deleteComment = (id) => {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
};
