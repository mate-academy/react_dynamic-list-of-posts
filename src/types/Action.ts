import { CommentType } from './CommentType';
import { PostType } from './PostType';
import { User } from './User';

export type Action =
  | { type: 'setUsers'; users: User[] }
  | { type: 'setPosts'; posts: PostType[] }
  | { type: 'chooseUser'; user: User | null }
  | { type: 'setComments'; comments: CommentType[] }
  | { type: 'isOpenPostBody'; isOpenPostBody: boolean }
  | { type: 'isPostsLoading'; isPostsLoading: boolean }
  | { type: 'choosedPost'; choosedPost: PostType | null }
  | { type: 'postsFetchError'; postsFetchError: boolean }
  | { type: 'deletedCommentId', deletedCommentId: number }
  | { type: 'isUserSelectOpen'; isUserSelectOpen: boolean }
  | { type: 'isCommentsLoading', isCommentsLoading: boolean }
  | { type: 'isWriteButtonHidden'; isWriteButtonHidden: boolean }
  | { type: 'setCommentsFetchError', commentsFetchError: boolean }
  | { type: 'isOpenNewCommentForm'; isOpenNewCommentForm: boolean }
  | { type: 'isDataSend'; isDataSend: boolean, newComment: CommentType };
