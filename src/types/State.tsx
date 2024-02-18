import { Comment, CommentData } from './Comment';
import { Post } from './Post';
import { User } from './User';

export interface State {
  users: User[];
  posts: Post[];
  comments: Comment[];
  newComment: CommentData | null;
  commentForDelete: Comment | null;
  currentUser: User | null;
  currentPost: Post | null;
  errorGetPosts: boolean;
  errorGetComments: boolean;
  isLoaderPosts: boolean;
  isLoaderComments: boolean;
  isLoaderAddComment: boolean;
  openCommentsButton: boolean;
  showFormWriteComment: boolean;
}
