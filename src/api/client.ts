import { client } from './fetchClient';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';

export const CommentsAPI = {
  getCommentsByPostId: (postId: number) =>
    client.get<Comment[]>('/comments?postId=' + postId),
  deleteComment: (id: number) => client.delete('/comments/' + id),
  addComment: (newComment: CommentData) =>
    client.post<Comment>('/comments', newComment),
};

export const getPosts = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>('/posts?userId=' + userId);
};

export const getUsers = (): Promise<User[]> => {
  return client.get<User[]>('/users');
};
