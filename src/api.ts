import { Comment } from './types/Comment';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const getUsers = () => {
  return client.get('/users');
};

export const getPosts = (userId: number) => {
  return client.get(`/posts/${userId}`);
};

export const postComment = (post: Post, data: Comment) => {
  return client.post(`/user-${post.userId}`, data);
};

export const deleteComment = (comment: Comment) => {
  return client.delete(`/post-${comment.postId}/comment-${comment.id}`);
};
