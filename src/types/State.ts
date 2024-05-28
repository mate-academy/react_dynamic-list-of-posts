import { Comment } from './Comment';
import { Error } from './Error';
import { Post } from './Post';
import { User } from './User';

export interface State {
  users: User[];
  selectedUser: {
    user: User | null;
    isLoading: boolean;
  };
  userPosts: Post[];
  selectedPost: {
    post: Post | null;
    isLoading: boolean;
  };
  postComments: {
    comments: Comment[];
    isWriting: boolean;
  };
  errors: Error[];
  sidebar: boolean;
}
