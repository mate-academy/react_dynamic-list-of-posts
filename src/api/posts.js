import { BASE_URL } from './api';

const request = (url, option) => fetch(`${BASE_URL}${url}`, option)
  .then(response => response.json())
  .then(posts => posts.data);

export const getUserPosts = (
  userId = '',
) => {
  const url = userId === ''
    ? `/posts`
    : `/posts/?userId=${userId}`;

  return request(url);
};

export const getPostDetails = postId => request(`/posts/${postId}`);

export const getPostComments = postId => request(
  `/comments/?postId=${postId}`,
);

export const createPostComments = comment => request(`/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(comment),
});

export const deletePostComment = commentId => request(
  `/comments/${commentId}`,
  {
    method: 'DELETE',
  },
);
