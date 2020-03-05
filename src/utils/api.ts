import { BASE_URL } from '../constants/api';
import { Comment, Post, User } from '../constants/types';

export const loadData = async <T>(specificUrl: string): Promise<T[]> => {
  const response = await fetch(`${BASE_URL}/${specificUrl}`);

  return response.json();
};

export const loadComments = async (): Promise<Comment[]> => {
  return loadData<Comment>('comments');
};

export const loadPosts = async (): Promise<Post[]> => {
  return loadData<Post>('posts');
};

export const loadUsers = async (): Promise<User[]> => {
  return loadData<User>('users');
};
