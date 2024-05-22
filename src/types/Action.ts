import { CommentType } from './CommentType';
import { PostType } from './PostType';
import { User } from './User';

export type Action =
  | { type: 'setUsers'; users: User[] }
  | { type: 'setPosts'; posts: PostType[] }
  | { type: 'chooseUser'; user: User | null }
  | { type: 'setComments'; comments: CommentType[] }
  | { type: 'choosedPost'; choosedPost: PostType | null}
  | { type: 'isOpenPostBody'; isOpenPostBody: boolean }
  | { type: 'isPostsLoading'; isPostsLoading: boolean }
  | { type: 'postsFetchError'; postsFetchError: boolean }
  | { type: 'isUserSelectOpen'; isUserSelectOpen: boolean };
