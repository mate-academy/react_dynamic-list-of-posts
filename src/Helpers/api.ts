const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api';

const getAll = async <T>(URL: string): Promise<T[]> => {
  return fetch(API_URL + URL)
    .then(response => response.json());
};

export const getPosts = (): Promise<Post[]> => getAll('/posts.json');
export const getUsers = (): Promise<User[]> => getAll('/users.json');
export const getComments = (): Promise<Comment[]> => getAll('/comments.json');

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
  comments: Comment[];
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: number;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
