import { Post } from './Post';
import { User } from './User';

export type State = {
  selectedUser: User | null;
  selectedPost: Post | null;
};
