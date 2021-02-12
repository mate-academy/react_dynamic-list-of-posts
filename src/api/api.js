/* eslint-disable */
const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data);

export const getPosts = () => request('/posts');
export const getUsers = () => request('/users');

export const getComments = postId => request('/comments')
  .then(response => response.filter(comment => (
    comment.postId === postId
  )));

// export const getUserPosts = postId => request(`/users/${postId}/todos`);

export const addPostComment = (newComment, postId) => {
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      ...newComment,
    }),
  })
}

export const deletePostComment = commentId => (
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
);
