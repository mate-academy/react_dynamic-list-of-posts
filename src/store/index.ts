/* eslint-disable max-len */
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import {
  Post, State, User, Comment,
} from '../react-app-env';

enum ActionType {
  SET_USERS = 'SET_USERS',
  SET_USERID = 'SET_USERID',
  SET_POSTDETAILS_ID = 'SET_POSTDETAILS_ID',
  SET_USER_POSTS = 'SET_USER_POSTS',
  SET_COMMENTS = 'SET_COMMENTS',
}

const InitialState:State = {
  users: [],
  userId: 0,
  postDetailsId: 0,
  userPosts: [],
  comments: [],
};

export const setUsers = createAction<User[]>(ActionType.SET_USERS);
export const setUserId = createAction<number>(ActionType.SET_USERID);
export const setPostDetailsId = createAction<number>(ActionType.SET_POSTDETAILS_ID);
export const setUserPosts = createAction<Post[]>(ActionType.SET_USER_POSTS);
export const setComments = createAction<Comment[]>(ActionType.SET_COMMENTS);

const reducer = createReducer(InitialState, (builder) => {
  builder.addCase(setUsers, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.users = action.payload;
  });
  builder.addCase(setUserId, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.userId = action.payload;
  });
  builder.addCase(setPostDetailsId, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.postDetailsId = action.payload;
  });
  builder.addCase(setUserPosts, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.userPosts = action.payload;
  });
  builder.addCase(setComments, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.comments = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
