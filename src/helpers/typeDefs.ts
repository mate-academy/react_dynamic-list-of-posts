export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithUser {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
