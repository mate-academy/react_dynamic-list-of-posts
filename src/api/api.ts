import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getPostsByUser = (userId: number | null) => {
  if (!userId) {
    return Promise.resolve([]);
  }

  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getCommentsByPost = (postId: number | null) => {
  if (!postId) {
    return Promise.resolve([]);
  }

  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const postComment = (newComment: Comment) => {
  return client.post(`/comments`, { ...newComment });
};
