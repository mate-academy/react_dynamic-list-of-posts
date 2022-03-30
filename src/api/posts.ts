import { BASE_URL } from './api';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getUserPosts = (userId: number) => {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
};

export const getPostComments = (postId: number) => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
};

export const addComment = (newComment: Partial<CommentInfo>) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  };

  return fetch(`${BASE_URL}/comments`, options)
    .then(response => response.json());
};

export const deleteComment = (commentId: number): Promise<number> => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(response => response.json());
};
