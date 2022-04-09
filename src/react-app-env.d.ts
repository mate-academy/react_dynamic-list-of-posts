/// <reference types="react-scripts" />

type User = {
  id: number,
  name: string,
};

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

type PostComment = {
  id: number,
  userId: number,
  name: string,
  email: string,
  body: string,
};