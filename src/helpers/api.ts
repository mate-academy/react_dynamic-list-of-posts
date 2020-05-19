const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
  comments?: Comment[];
}

export interface UserAddress {
  city: string;
  street: string;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

const getData = <T>(url: string): Promise<T[]> => (
  fetch(API_URL + url).then(response => response.json())
);

export const getPosts = () => getData<Post>('/posts.json');
export const getComments = () => getData<Comment>('/comments.json');
export const getUsers = () => getData<User>('/users.json');
