import { Actions } from '../../../../libs/enums';
import { Comment } from '../../../../libs/types';

export type CommentsAction =
  {
    type: Actions.SetComments,
    payload: { comments: Comment[] }
  }
  | {
    type: Actions.DeleteComment,
    payload: { commentId: number }
  }
  | {
    type: Actions.AddComment,
    payload: { comment: Comment }
  };
