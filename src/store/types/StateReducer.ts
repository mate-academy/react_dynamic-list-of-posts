import { Action } from './Action';
import { State } from './State';

export type StateReducer = (
  state: State,
  action: Action
) => State;
