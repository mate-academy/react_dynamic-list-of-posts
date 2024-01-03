import { Dispatch } from 'react';
import { Actions } from '../enums';
import { Action } from '../../store';
import { Comment } from '../types';
import { ActionType } from './types/ActionType';

type LoadCommentsAction = (
  dispatch: Dispatch<Action>,
  comments: Comment[]
) => void;

type DeleteCommentAction = (
  dispatch: Dispatch<Action>,
  commentId: number,
) => void;

type AddCommentAction = (
  dispatch: Dispatch<Action>,
  comment: Comment,
) => void;

export const loadComments: LoadCommentsAction = (dispatch, comments) => {
  dispatch({ type: Actions.SetComments, payload: { comments } });
};

export const resetComments: ActionType = (dispatch) => {
  dispatch({ type: Actions.SetComments, payload: { comments: [] } });
};

export const deleteComment: DeleteCommentAction = (dispatch, commentId) => {
  dispatch({ type: Actions.DeleteComment, payload: { commentId } });
};

export const addComment: AddCommentAction = (dispatch, comment) => {
  dispatch({ type: Actions.AddComment, payload: { comment } });
};
