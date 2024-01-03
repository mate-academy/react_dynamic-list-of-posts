import { Actions } from '../../../libs/enums';
import { CommonState, CommonAction } from './types';

export type CommonReducer = (
  state: CommonState,
  action: CommonAction,
) => CommonState;

export const commonReducer: CommonReducer = (state, action) => {
  switch (action.type) {
    case Actions.SetIsLoading: {
      const { isLoading } = action.payload;

      return { ...state, isLoading };
    }

    case Actions.SetErrorMessage: {
      const { errorMessage } = action.payload;

      return { ...state, errorMessage };
    }

    case Actions.SetIsShowAddCommentForm: {
      const { isShowAddCommentForm } = action.payload;

      return { ...state, isShowAddCommentForm };
    }

    default:
      return state;
  }
};
