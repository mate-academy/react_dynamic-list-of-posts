import { Post } from './Post';
import { User } from './User';

export type Setters = {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};
