import { PostProps, CommentProps, UserProps } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(API_URL + url);

  return response.json();
}

export const getPosts = (): Promise<PostProps[]> => {
  return getData<PostProps[]>('/posts');
};

export const getUsers = (): Promise<UserProps[]> => {
  return getData<UserProps[]>('/users');
};

export const getComments = (): Promise<CommentProps[]> => {
  return getData<CommentProps[]>('/comments');
};
