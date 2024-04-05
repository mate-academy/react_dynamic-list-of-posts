import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export interface State {
  users: User[];
  errorMessage: string;
  selectedUser: null | User;
  posts: Post[];
  isLoading: boolean;
  selectedPost: null | Post;
  hasSidebar: boolean;
  comments: Comment[];
}
