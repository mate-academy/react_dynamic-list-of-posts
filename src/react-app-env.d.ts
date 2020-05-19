// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: {};
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PreparedPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}
