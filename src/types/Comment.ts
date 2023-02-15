export interface Comment {
  filter(arg0: (comment: any) => boolean): import("react").SetStateAction<never[]>;
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
