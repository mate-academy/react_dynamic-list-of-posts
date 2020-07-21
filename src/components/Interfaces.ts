export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}
