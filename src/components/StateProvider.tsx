import { useEffect, useReducer } from 'react';

import {
  initialState,
  stateReducer as reducer,
  DispatchContext, StateContext,
} from '../store';
import { loadUsers } from '../api/users';
import { actions } from '../libs/actions/actions';

type Props = {
  children: React.ReactNode;
};

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadUsers()
      .then((response) => {
        actions.loadUsers(dispatch, response);
      })
      .catch(() => {
        actions.showErrorMessage(dispatch);
      });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
