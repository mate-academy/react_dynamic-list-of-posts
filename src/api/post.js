import { BASE_URL } from './api';

const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  })
  .then(result => result.data);
const remove = url => request(url, { method: 'DELETE' });

export const getUserPosts = userId => request(`/posts?userId=${userId}`);
export const getPosts = () => request('/posts ');
export const getPostDetails = postId => request(`/posts/${postId}`);
export const getPostComments = postId => request(`/comments?postId=${postId}`);
export const deletComment = commentID => remove(`/comments/${commentID}`);
// eslint-disable-next-line max-len
export const createPost = ({ postId, name, email, body }) => fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    postId,
    name,
    email,
    body,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}- Error`);
    }

    return response.json();
  });
