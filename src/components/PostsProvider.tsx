import React, { useEffect, useReducer } from 'react';
import { INITIAL_STATE } from '../constants/initialState';
import { Action } from '../types/Action';
import { reduser } from '../utils/reduser';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Error } from '../types/Error';
import { URL } from '../types/Url';

export const StateContext = React.createContext(INITIAL_STATE);
export const DispatchContext
  = React.createContext<(action: Action) => void>(() => {});

type Props = {
  children: React.ReactNode
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, INITIAL_STATE);

  useEffect(() => {
    (async () => {
      try {
        const users = await client.get<User[]>(URL.Users);

        dispatch({ type: 'loadUsers', payload: users });
      } catch (error) {
        dispatch({ type: 'error', payload: Error.Users });
      }
    })();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
