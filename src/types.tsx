export interface Post {
  id: number,
  userId: number,
  title: null | string,
  body: null | string,
}

export interface Comment {
  id: number,
  postId: number,
  name: string | null,
  email: string | null,
  body: string | null,
}
