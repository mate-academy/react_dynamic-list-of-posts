import { BASE_URL } from './api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getAllPosts = (): Promise<Post[]> => {
  return request('/posts');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
