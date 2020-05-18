const API_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  name: string;
  body: string;
  postId: number;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
  comments?: Comment[];
}

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
}

export const getUsers = () => getAll<User>('/users');
export const getPosts = () => getAll<Post>('/posts');
export const getComments = () => getAll<Comment>('/comments');
