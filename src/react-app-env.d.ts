// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: object;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

type Comments = Comment[];

interface PreparedPost extends Post {
  user: User;
  comments: Comments;
}
