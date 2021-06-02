import { BASE_URL } from './api';

const request = (url, option) => (
  fetch(`${BASE_URL}${url}`, option).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  }).then(json => json.data)
);

export const getPosts = () => request('/posts');
export const getPost = id => request(`/posts/${id}`);
export const getUsers = () => request('/users');
export const getUserPosts = id => request('/posts')
  .then(posts => posts
    .filter(post => (+post.userId === id || id === Infinity)));

export const getCommentsPost = id => request('/comments')
  .then(comments => comments
    .filter(comment => (+comment.postId === id)));

export const addNewComment = comment => (
  request('/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
  })
);

export const deleteComment = id => (
  request(`/comments/${id}`, {
    method: 'DELETE',
  })
);
