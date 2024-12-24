import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = ({ id }: Pick<User, 'id'>) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getComments = ({ id }: Pick<Post, 'id'>) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  const data = {
    postId,
    name,
    email,
    body,
  };

  return client.post<Comment>('/comments', data);
};

export const deleteComment = ({ id }: Pick<Comment, 'id'>) => {
  return client.delete(`/comments/${id}`);
};
