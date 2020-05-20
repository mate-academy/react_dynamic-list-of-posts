
const getAll = <T>(url: string): Promise<T[]> => {
  const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

  return fetch(`${API_URL}${url}.json`)
    .then(response => response.json());
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
  comments?: Comments[];
}

export interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  user?: User;
}

export const getUsers = () => (getAll<User>('users'));
export const getPosts = () => (getAll<Posts>('posts'));
export const getComents = () => (getAll<Comments>('comments'));
