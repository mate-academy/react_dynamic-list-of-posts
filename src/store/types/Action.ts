import {
  CommentsAction, CommonAction, PostsAction, UsersAction,
} from '../reducers';

export type Action = UsersAction | PostsAction | CommonAction | CommentsAction;
