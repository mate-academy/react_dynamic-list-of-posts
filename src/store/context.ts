import { Dispatch, createContext } from 'react';

import { Action, State } from './types';
import { initialState } from './stateReducer';

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});
