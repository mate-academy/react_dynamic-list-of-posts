export interface Comment {
  id?: number,
  createdAt?: string,
  updatedAt?: string,
  postId: number,
  name: string,
  email: string,
  body: string,
}
