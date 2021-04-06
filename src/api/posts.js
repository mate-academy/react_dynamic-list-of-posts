import { BASE_URL } from './api';

function request(url) {
  return fetch(`${BASE_URL}/${url}`)
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response) {
        return response.json();
      }
    });
}

export function getUsers() {
  const allUsers = request(`users`);

  return allUsers
    .then(users => users.data
      .filter(user => user.id <= 10)
      .sort((prevUser, nextUser) => prevUser.id - nextUser.id));
}

export function getUserPosts(userId) {
  const allPosts = request(`posts`);

  if (userId) {
    return allPosts
      .then(response => response.data.filter(post => post.userId === userId));
  }

  return allPosts
    .then(response => response.data);
}

// eslint-disable-next-line consistent-return
export const getPostDetails = (postId) => {
  if (postId) {
    return request(`posts/${postId}`)
      .then(response => response.data);
  }
};

export const getPostComments = postId => request(`comments`)
  .then(response => response.data.filter(comment => comment.postId === postId));

/* eslint-disable */
export const deleteComment = (commentId) => {
  /* eslint-enable */
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .catch((error) => {
      throw new Error(error);
    });
};

export const addComment = comment => fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    id: comment.id,
    postId: comment.postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
  }),
})
  .catch((error) => {
    throw new Error(error);
  });
