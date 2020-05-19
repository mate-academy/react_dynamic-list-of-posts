import { ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user? : User;
  comments? : Comment[];
}
export interface Comment {
  [x: string]: ReactNode;
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
}
export const getUsers = (): Promise<User[]> => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());
};

export const getPosts = (): Promise<Post[]> => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json());
};

export const getComments = (): Promise<Comment[]> => {
  return fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json());
};
