import { Comment } from './Comment';
import {
  HandleClosePostDetails,
  HandleCreateComment,
  HandleDeleteComment,
  HandleLoadComments,
  HandleSelectPost,
  HandleSelectUser,
} from './HandlerFunctions';
import { Post } from './Post';
import { User } from './User';

export type SharedContextValue = {
  users: User[];
  posts: Post[];
  comments: Comment[];
  isError: boolean;
  selectedUser: User | null;
  selectedPost: Post | null;
  isLoadingPosts: boolean;
  isLoadingComments: boolean;
  isSumbitting: boolean;
  handleCreateComment: HandleCreateComment;
  handleDeleteComment: HandleDeleteComment;
  handleLoadComments: HandleLoadComments;
  handleSelectUser: HandleSelectUser;
  handleSelectPost: HandleSelectPost;
  handleClosePostDetails: HandleClosePostDetails;
};
