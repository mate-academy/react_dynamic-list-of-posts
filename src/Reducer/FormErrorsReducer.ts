import { Actions, ErrorType } from '../types/ErrorForm';

export const initialErrorState: ErrorType = {
  name: '',
  email: '',
  body: '',
};

export const errorInputReducer = (
  state: ErrorType,
  action: Actions,
): ErrorType => {
  switch (action.type) {
    case 'SET_NAME_ERROR':
      return { ...state, name: action.message };
    case 'SET_EMAIL_ERROR':
      return { ...state, email: action.message };
    case 'SET_BODY_ERROR':
      return { ...state, body: action.message };
    case 'SET_CLEAR':
      return initialErrorState;
    default:
      return state;
  }
};
