export interface Post {
  id: number,
  userId: number,
  title: string,
  // body: string,
  // createdAt: string,
  // updatedAt: string
}

export interface User {
  id: number,
  name: string,
  // username: string,
  // email: string,
  // phone: string
}

export interface Details {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type NewCommentWithoutId = Omit<Comment, 'id'>;
