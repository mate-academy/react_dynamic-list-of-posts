export interface Post {
  id: PostID;
  userId: number;
  title: string;
  body: string;
}

export type PostID = number;
