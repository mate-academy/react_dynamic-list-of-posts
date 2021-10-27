import { Post } from '../types/Post';

export const getUserPosts = (userId: number): Promise<Post[]> => {
  let API = `https://mate.academy/students-api/posts?userId=${userId}`;

  if (userId === 0) {
    API = 'https://mate.academy/students-api/posts';
  }

  return fetch(API)
    .then(response => response.json());
};

export const getPostDetails = (postId: number | null): Promise<Post> => {
  return fetch(`https://mate.academy/students-api/posts/${postId}`)
    .then(response => response.json());
};
