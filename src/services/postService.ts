import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};
