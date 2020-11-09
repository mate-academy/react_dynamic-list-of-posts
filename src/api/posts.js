import { BASE_URL } from './api';

export const getUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then((posts) => {
    if (+userId) {
      return posts.data.filter(post => post.userId === +userId);
    }

    return posts.data;
  });

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json())
  .then(posts => posts.data);
