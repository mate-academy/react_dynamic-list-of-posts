import { Actions } from '../../../libs/enums';
import { CommentsAction, CommentsState } from './types';

export type CommentsReducer = (
  state: CommentsState,
  action: CommentsAction,
) => CommentsState;

export const commentsReducer: CommentsReducer = (state, action) => {
  switch (action.type) {
    case Actions.SetComments: {
      const { comments } = action.payload;

      return { ...state, comments };
    }

    case Actions.AddComment: {
      const { comment } = action.payload;

      return { ...state, comments: [...state.comments, comment] };
    }

    case Actions.DeleteComment: {
      const { commentId } = action.payload;

      return {
        ...state,
        comments: state.comments.filter(({ id }) => id !== commentId),
      };
    }

    default:
      return state;
  }
};
