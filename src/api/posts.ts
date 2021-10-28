import { BASE_URL } from './api';
import { CommentToPost } from '../types/CommentToPost';

const getData = (endPoint: string) => {
  return fetch(`${BASE_URL}${endPoint}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
};

export const getPosts = () => getData('/posts');

export const getUsers = () => getData('/users');

export const getUserPosts = (userId: number) => getData(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => getData(`/posts/${postId}`);

export const getPostComments = (postId: number) => getData(`/comments?postId=${postId}`);

export const removeComment = (commentId: string) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};

export const createComment = (comment: CommentToPost) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
};
