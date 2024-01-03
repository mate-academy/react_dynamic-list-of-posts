import combineReducers from 'react-combine-reducers';
import { StateReducer } from './types';
import {
  commonReducer, initialCommonState,
  usersReducer, initialUsersState,
  postsReducer, initialPostsState,
  commentsReducer, initialCommentsState,
} from './reducers';

export const [stateReducer, initialState] = combineReducers<StateReducer>({
  common: [commonReducer, initialCommonState],
  users: [usersReducer, initialUsersState],
  posts: [postsReducer, initialPostsState],
  comments: [commentsReducer, initialCommentsState],
});
