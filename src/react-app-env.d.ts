// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  addres: Address;
  [prop: string]: any;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Address {
  city: string;
  street: string;
  [prop: string]: any;
}
