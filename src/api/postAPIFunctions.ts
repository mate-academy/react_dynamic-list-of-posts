import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getPostsByUserId = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getPostById = (id: number) => {
  return client.get<Post>(`/posts/${id}`);
};

export const getPostComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addComment = (comment: Comment) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteCommentInPost = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
