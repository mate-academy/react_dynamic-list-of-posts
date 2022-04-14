import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { request } from './api';

export const getUserPosts = (userId?: number): Promise<Post[]> => {
  if (!userId) {
    return request('/posts');
  }

  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const createComment = (newComment: Comment) => {
  request('/comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
  });
};
