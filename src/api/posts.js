import { BASE_URL } from './api';
import postsImages from './posts_images.json';

const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(posts => posts.data.map((post, index) => ({
    ...post, image: postsImages[index].image,
  })));

export const getPosts = () => request('/posts');
export const getPostDetails = postId => request(`/posts/${postId}`);
