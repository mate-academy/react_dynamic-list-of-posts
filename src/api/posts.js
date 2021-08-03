import { getData } from './api';

export const getUserPosts = userId => getData('/posts')
  .then(posts => (
    userId === 0
      ? posts
      : posts.filter(post => post.userId === userId)
  ))
  .catch(() => []);

export const getPostDetails = postId => getData(`/posts/${postId}`)
  .catch(() => null);
