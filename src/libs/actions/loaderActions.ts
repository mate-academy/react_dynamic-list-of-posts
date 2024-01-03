import { Actions } from '../enums';
import { ActionType } from './types/ActionType';

export const showLoader: ActionType = (dispatch) => {
  dispatch({ type: Actions.SetIsLoading, payload: { isLoading: true } });
};

export const hideLoader: ActionType = (dispatch) => {
  dispatch({ type: Actions.SetIsLoading, payload: { isLoading: false } });
};
