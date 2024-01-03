import { Dispatch } from 'react';
import { Actions } from '../enums';
import { Action } from '../../store';
import { Post } from '../types';
import { ActionType } from './types/ActionType';

type LoadPostsAction = (
  dispatch: Dispatch<Action>,
  posts: Post[]
) => void;

type SelectPostAction = (
  dispatch: Dispatch<Action>,
  selectedPost: Post | null
) => void;

export const loadPosts: LoadPostsAction = (dispatch, posts) => {
  dispatch({ type: Actions.SetPosts, payload: { posts } });
};

export const resetPosts: ActionType = (dispatch) => {
  dispatch({ type: Actions.SetPosts, payload: { posts: [] } });
};

export const selectPost: SelectPostAction = (dispatch, selectedPost) => {
  dispatch({ type: Actions.SetPost, payload: { selectedPost } });
};

export const deselectPost: ActionType = (dispatch) => {
  dispatch({ type: Actions.SetPost, payload: { selectedPost: null } });
};
