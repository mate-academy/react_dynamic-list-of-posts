import { BASE_URL } from './api';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then(res => res.json())
  .then(res => res.data)
  .catch(error => error);

export const getUserPosts = async(userId) => {
  const posts = await request('/posts');

  return (
    userId
      ? posts.filter(post => post.userId === userId)
      : posts
  );
};

export const usersPosts = () => request('/posts');
export const usersDataFromServer = () => request(`/users`);
export const getPostDetails = postId => request(`/posts/${postId}`);
