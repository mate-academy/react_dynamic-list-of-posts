import { BASE_URL } from './api';

export const getUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json()
    .then(result => result.data)
    .then((posts) => {
      if (userId === 0) {
        return posts;
      }

      return posts.filter(post => (post.userId === userId));
    }));

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json());
