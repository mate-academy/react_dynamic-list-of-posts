import { ErrorMessages } from '../../../../libs/enums';

export type CommonState = {
  isLoading: boolean,
  errorMessage: ErrorMessages,
  isShowAddCommentForm: boolean,
};
