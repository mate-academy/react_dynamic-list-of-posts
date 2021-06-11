import { get } from './api';

export const getPosts = () => get('/posts');
export const getUsersPosts = selectedUserId => getPosts()
  .then(posts => posts.filter(post => post.userId === +selectedUserId));

export const getPostDetails = postId => get(`/posts/${postId}`);
