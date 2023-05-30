import { Comment } from './Comment';

export interface MessageProps {
  comment: Comment;
  removeComment: (id: number) => void;
}
