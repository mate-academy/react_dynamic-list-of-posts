import { CommentType } from './CommentType';
import { PostType } from './PostType';
import { User } from './User';

export interface State {
  users: User[];
  posts: PostType[];
  user: User | null;
  isDataSend: boolean;
  comments: CommentType[];
  isPostSelected: boolean;
  isPostsLoading: boolean;
  isOpenPostBody: boolean;
  postsFetchError: boolean;
  isUserSelectOpen: boolean;
  isCommentsLoading: boolean;
  commentsFetchError: boolean;
  isWriteButtonHidden: boolean;
  choosedPost: PostType | null;
  isOpenNewCommentForm: boolean;
}
