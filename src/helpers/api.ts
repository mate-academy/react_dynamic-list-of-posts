const API_URL = 'https://jsonplaceholder.typicode.com/';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
  comments?: Comment[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    suite: string;
    street: string;
    city: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

export const getPosts = () => getAll<Post>('posts');

export const getUsers = () => getAll<User>('users');

export const getComments = () => getAll<Comment>('comments');
