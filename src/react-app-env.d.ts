/// <reference types="react-scripts" />

type Posts = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string,
};

type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};

type Comments = {
  id?: number,
  createdAt?: string,
  updatedAt?: string,
  postId?: number,
  name: string,
  email: string,
  body: string,
};
