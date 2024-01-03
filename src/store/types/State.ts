import {
  CommentsState, CommonState, PostsState, UsersState,
} from '../reducers';

export type State = {
  common: CommonState;
  users: UsersState;
  posts: PostsState;
  comments: CommentsState;
};
