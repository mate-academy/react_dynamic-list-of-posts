import { Dispatch } from 'react';
import { Actions, ErrorMessages } from '../enums';
import { Action } from '../../store';
import { ActionType } from './types/ActionType';

type ShowErrorMessageAction = (
  dispatch: Dispatch<Action>,
  errorMessage?: ErrorMessages,
) => void;

export const showErrorMessage: ShowErrorMessageAction = (
  dispatch,
  errorMessage = ErrorMessages.RequestError,
) => {
  dispatch({
    type: Actions.SetErrorMessage,
    payload: { errorMessage },
  });
};

export const hideErrorMessage: ActionType = (dispatch) => {
  dispatch({
    type: Actions.SetErrorMessage,
    payload: { errorMessage: ErrorMessages.NoError },
  });
};
