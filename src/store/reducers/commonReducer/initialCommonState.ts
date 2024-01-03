import { ErrorMessages } from '../../../libs/enums';
import { CommonState } from './types';

export const initialCommonState: CommonState = {
  isLoading: false,
  errorMessage: ErrorMessages.NoError,
  isShowAddCommentForm: false,
};
