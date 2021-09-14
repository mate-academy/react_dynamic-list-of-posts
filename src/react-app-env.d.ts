/// <reference types="react-scripts" />

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: Adress;
}

interface Adress {
  id: number;
  userId: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}
