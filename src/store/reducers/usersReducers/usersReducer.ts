import { Actions } from '../../../libs/enums';
import { UsersAction, UsersState } from './types';

type UsersReducer = (
  state: UsersState,
  action: UsersAction,
) => UsersState;

export const usersReducer: UsersReducer = (state, action) => {
  switch (action.type) {
    case Actions.LoadUsers: {
      const { users } = action.payload;

      return { ...state, users };
    }

    case Actions.SetUser: {
      const { selectedUser } = action.payload;

      return { ...state, selectedUser };
    }

    default:
      return state;
  }
};
