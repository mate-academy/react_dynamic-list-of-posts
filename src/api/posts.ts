import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { CommentRequest } from '../types/commentRequest';

export const getUsers = (url: string) => {
  return client.get<User[]>(`/${url}`);
};

export const getPostsByUser = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const postInfo = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (data: CommentRequest) => {
  return client.post<CommentRequest>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
