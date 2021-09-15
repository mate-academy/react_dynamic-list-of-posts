import { BASE_URL } from './api';

export const getAllPosts = ():Promise<Post[]> => {
  return fetch(`${BASE_URL}/posts`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};

export const getUserPosts = (userId: number):Promise<Post[]> => {
  return getAllPosts()
    .then(posts => {
      return posts.filter((post: Post) => post.userId === userId);
    });
};
