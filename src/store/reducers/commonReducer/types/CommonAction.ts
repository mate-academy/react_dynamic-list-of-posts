import { Actions, ErrorMessages } from '../../../../libs/enums';

export type CommonAction =
  {
    type: Actions.SetIsLoading,
    payload: { isLoading: boolean }
  }
  | {
    type: Actions.SetErrorMessage,
    payload: { errorMessage: ErrorMessages }
  } | {
    type: Actions.SetIsShowAddCommentForm,
    payload: { isShowAddCommentForm: boolean }
  };
