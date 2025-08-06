import { ErrorActions, Notification } from '../types/Notification';

export const initialErrors: Notification = {
  error: '',
  alarm: '',
  source: 'Userloading',
};

export const errorReducer = (
  state: Notification,
  action: ErrorActions,
): Notification => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        error: action.error,
        alarm: '',
        source: action.source,
      };

    case 'SET_ALARM':
      return {
        error: '',
        alarm: action.alarm,
        source: action.source,
      };

    case 'SET_CLEAR':
      return {
        ...initialErrors,
        source: action.source,
      };

    default:
      return state;
  }
};
