// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  [key: string]: number| string | Address | Company;
}

interface Company {
  [key: string]: string;
}

interface Address {
  street: string;
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

interface PreparedPost extends Post {
  user: User;
  comments: Comment[];
}
