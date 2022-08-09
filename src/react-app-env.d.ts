/// <reference types="react-scripts" />
export interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

export interface Comment extends NewComment {
  id: number,
  createdAt: string,
  updatedAt: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  updatedAt: string,
  address: {
    id: number,
    userId: numberstring,
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    createdAt: string,
    updatedAt: string,
  }
}

export interface Post {
  id: number,
  userId: number,
  userId: number,
  title: string,
  body: string,
}
