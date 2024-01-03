import { Actions } from '../enums';
import { ActionType } from './types/ActionType';

export const showAddCommentsForm: ActionType = (dispatch) => {
  dispatch({
    type: Actions.SetIsShowAddCommentForm,
    payload: { isShowAddCommentForm: true },
  });
};

export const hideAddCommentsForm: ActionType = (dispatch) => {
  dispatch({
    type: Actions.SetIsShowAddCommentForm,
    payload: { isShowAddCommentForm: false },
  });
};
