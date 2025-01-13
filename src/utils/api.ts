import { client } from './fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getPostsOfUser = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getCommentsOfPost = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addComment = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', newComment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
