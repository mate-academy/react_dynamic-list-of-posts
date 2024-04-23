import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

export type State = {
  users: User[];
  selectedUser: User | null;
  userPosts: Post[];
  selectedPost: Post | null;
  comments: Comment[];
  error: string;
  sidebarError: string;
};
