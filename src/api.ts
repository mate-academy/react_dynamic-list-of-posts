import { Post, Comment, User } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(API_URL + url);

  return response.json();
}

export const getPosts = (): Promise<Post[]> => {
  return getData<Post[]>('/posts');
};

export const getUsers = (): Promise<User[]> => {
  return getData<User[]>('/users');
};

export const getComments = (): Promise<Comment[]> => {
  return getData<Comment[]>('/comments');
};
