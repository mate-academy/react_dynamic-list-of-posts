import { Comment } from './Comment';
import { Error } from './Error';
import { Post } from './Post';
import { User } from './User';

export interface State {
  users: User[],
  errorMessage: Error,
  selectedUser: null | User,
  userPosts: null | Post[],
  selectedPost: null | Post,
  postComments: null | Comment[]
}
