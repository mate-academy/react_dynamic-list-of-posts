export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, options = {}) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      return response.json();
    });
};

export const getAllPosts = (): Promise<Post[]> => {
  return request('/posts');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`/posts/?userId=${userId}`);
};

export const getSelectedPosts = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
