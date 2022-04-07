import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { BASE_URL } from './api';

export const getUserPosts = (userId: number): Promise<Post[]> => {
  if (!userId) {
    return fetch(`${BASE_URL}/posts`).then(response => response.json());
  }

  return fetch(`${BASE_URL}/posts?userId=${userId}`).then(response => response.json());
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return fetch(`${BASE_URL}/posts/${postId}`).then(response => response.json());
};

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return fetch(`${BASE_URL}/comments?postId=${postId}`).then(response => response.json());
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const createComment = (newComment: Comment) => {
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
  });
};
