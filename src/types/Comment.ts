export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentProps {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  postId: number;
  setErrorMessage: (str: string) => void;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
