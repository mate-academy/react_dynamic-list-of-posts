import { BASE_URL } from './api';

export const getAllPosts = (endpoint = ''):Promise<Post[]> => {
  return fetch(`${BASE_URL}/posts${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};

export const getUserPosts = (userId: number):Promise<Post[]> => {
  return getAllPosts(`?userId=${userId}`);
};

export const getPostDetails = (postId: number):Promise<Post> => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};

export const getPostComments = (postId: number):Promise<Comment[]> => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};

export const addComment = (newComment: Partial<Comment>) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};
