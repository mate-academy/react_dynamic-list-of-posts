export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (
  url, options = {},
) => fetch(`${BASE_URL}/${url}`, options)
  .then((result) => {
    if (!result.ok) {
      throw new Error('Data wasn`t received');
    }

    return result.json();
  });

export const post = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

const remove = url => request(url, {
  method: 'DELETE',
});

export const createComment = newComment => post('comments', newComment);
export const getUsers = () => request('users').then(response => response.data);
export const getPosts = () => request('posts').then(response => response.data);
export const getUserPosts = userId => request(`posts?userId=${userId}`)
  .then(response => response.data);
export const getPostDetails = postId => request(`posts/${postId}`)
  .then(response => response.data);
export const getPostComments = () => request('comments')
  .then(response => response.data);
export const removeComment = commentId => remove(`comments/${commentId}`);
