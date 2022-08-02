/// <reference types="react-scripts" />

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
};

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
