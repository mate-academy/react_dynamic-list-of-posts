export interface Post {
  userId: number,
  title: string,
  body: string,
  id: number,
}

export interface Comment {
  postId: number,
  name: string,
  email: string,
  body: string,
  id: number,
}

export interface User {
  id: number,
  name: string,
}