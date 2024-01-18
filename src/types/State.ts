import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';
import { Error } from './Error';

export type State = {
  users: User[];
  selectedUser: User | null;
  posts: Post[];
  selectedPost: Post | null;
  isLoadingPosts: boolean;
  comments: Comment[];
  isLoadingComments: boolean;
  isOpenForm: boolean;
  error: Error | '';
};
