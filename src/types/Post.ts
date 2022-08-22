export interface Post {
  id: number,
  title: string,
  body: string,
  createdAt: Date | string,
  updatedAt: Date | string,
  userId: number,
}
