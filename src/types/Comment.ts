export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
export interface CommentsProps {
  isForm: boolean;
  removeComment: (id: number) => void;
  setIsForm: (isForm: boolean) => void;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
