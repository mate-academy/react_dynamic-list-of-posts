import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = (): Promise<User[]> => {
  return client.get('/users');
};

export const getPosts = (userId: number): Promise<Post[]> => {
  return client.get(`/users/${userId}`);
};

export const postComment = (post: Post, data: Comment) => {
  return client.post(`/users/${post.userId}/posts/${post.id}`, data);
};

export const deleteComment = (comment: Comment) => {
  return client.delete(`/post-${comment.postId}/comment-${comment.id}`);
};
