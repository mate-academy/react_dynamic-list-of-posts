import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const createComment = ({
  name, email, body, postId,
}: Omit<Comment, 'id'>) => {
  return client.post('/comments', {
    name, email, body, postId,
  });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
