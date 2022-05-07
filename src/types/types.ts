export interface Posts {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number | null,
  title: string,
  body: string,
}

export interface Comments {
  id: number,
  createdAt: string,
  updatedAt: string,
  postId: number,
  name: string,
  body: string,
  email: string,
}
