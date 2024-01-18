import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

import { getUsers } from './api/users';
import { stateReducer } from './reducers/stateReducer';

import { State } from './types/State';
import { Action } from './types/Action';
import { Error } from './types/Error';

const defaultDispatch: React.Dispatch<Action> = () => {};

const initialState: State = {
  users: [],
  selectedUser: null,
  posts: [],
  selectedPost: null,
  isLoadingPosts: false,
  comments: [],
  isLoadingComments: false,
  isOpenForm: false,
  error: '',
};

export const DispatchContext = createContext(defaultDispatch);
export const StateContext = createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleLoadUsersError = useCallback(() => {
    dispatch({ type: 'setError', payload: Error.LoadUsers });
    setTimeout(() => {
      dispatch({ type: 'setError', payload: '' });
    }, 3000);
  }, [dispatch]);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        dispatch({ type: 'setUsers', payload: usersFromServer });
      })
      .catch(handleLoadUsersError);
  }, [dispatch, handleLoadUsersError]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
