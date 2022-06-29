import { State } from '../react-app-env';

export const getUsersSelector = (state:State) => state.users;
export const getUserSelector = (state:State) => state.userId;
export const getPostDetailsId = (state:State) => state.postDetailsId;
export const getUserPostsFromState = (state: State) => state.userPosts;
export const getComments = (state: State) => state.comments;
