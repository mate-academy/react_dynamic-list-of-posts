// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  geo: Geo;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  [key: string]: string;
}

interface Company {
  [key: string]: string;
}

interface Geo {
  [key: string]: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

interface PostFromServer {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}
