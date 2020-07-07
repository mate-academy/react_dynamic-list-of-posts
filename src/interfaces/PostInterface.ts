import { UserInterface } from './UserInterface';
import { CommentInterface } from './CommentInterface';

export interface PostOriginalInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostInterface extends PostOriginalInterface {
  [key: string]: string | number | UserInterface | CommentInterface[];
  user: UserInterface;
  comments: CommentInterface[];
}
