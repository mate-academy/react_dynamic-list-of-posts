import { Error } from '../types/Error';
import { State } from '../types/State';

export const INITIAL_STATE: State = {
  users: [],
  errorMessage: Error.None,
  selectedUser: null,
  userPosts: null,
  selectedPost: null,
  postComments: null,
};
