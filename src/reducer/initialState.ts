import { AppState } from './types';

export const initialState: AppState = {
  selectedUserId: null,
  posts: [],
  selectedPostId: null,
  postsNotification: null,
  comments: [],
  commentsNotification: null,
};
