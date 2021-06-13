import { BASE_URL } from './api';

const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result.data);

export const getUsers = () => request('/users');

export const getPosts = () => request('/posts');

export const getUserPosts = userId => (
  request('/posts')
    .then(posts => posts.filter(post => post.userId === userId))
);

export const getPostDetails = postId => request(`/posts/${postId}`);

export const getPostComments = postId => (
  request(`/comments`)
    .then(comments => comments.filter(comment => comment.postId === postId))
);

export const deleteComment = commentId => (
  request(`/comments/${commentId}`, {
    method: 'DELETE',
  })
);

export const createComment = data => (
  request('/comments', {
    method: 'POST',
    body: JSON.stringify(data),
  })
);
