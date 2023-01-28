export enum IError {
  None,
  Add,
  Delete,
  Load,
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}
