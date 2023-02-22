import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import comment from '../types/Comment';
import { CommentPostRequest } from '../types/CommentPostRequest';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postID: number) => {
  return client.get<comment[]>(`/comments?postId=${postID}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (data: CommentPostRequest) => {
  return client.post<comment>('/comments/', data);
};
