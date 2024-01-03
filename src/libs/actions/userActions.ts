import { Dispatch } from 'react';
import { Actions } from '../enums';
import { Action } from '../../store';
import { User } from '../types';
import { ActionType } from './types/ActionType';

type LoadUsersAction = (
  dispatch: Dispatch<Action>,
  users: User[]
) => void;

type SelectUserAction = (
  dispatch: Dispatch<Action>,
  selectedUser: User | null
) => void;

export const loadUsers: LoadUsersAction = (dispatch, users) => {
  dispatch({ type: Actions.LoadUsers, payload: { users } });
};

export const selectUser: SelectUserAction = (dispatch, selectedUser) => {
  dispatch({ type: Actions.SetUser, payload: { selectedUser } });
};

export const deselectUser: ActionType = (dispatch) => {
  dispatch({ type: Actions.SetUser, payload: { selectedUser: null } });
};
