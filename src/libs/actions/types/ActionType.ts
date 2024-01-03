import { Dispatch } from 'react';
import { Action } from '../../../store';

export type ActionType = (dispatch: Dispatch<Action>) => void;
