import { CommentType } from './CommentType';
import { PostType } from './PostType';
import { User } from './User';

export interface State {
  users: User[];
  posts: PostType[];
  user: User | null;
  comments: CommentType[];
  isPostSelected: boolean;
  isPostsLoading: boolean;
  isOpenPostBody: boolean;
  postsFetchError: boolean;
  isUserSelectOpen: boolean;
  choosedPost: PostType | null;
}
