import { Comment } from './Comment';

export type CommentsState = {
  [postId: number]: Comment[] | null;
};
