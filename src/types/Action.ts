import { Comment } from './Comment';
import { Error } from './Error';
import { Post } from './Post';
import { User } from './User';

export type Action
= {
  type: 'loadUsers',
  payload: User[]
}
| {
  type: 'error',
  payload: Error
}
| {
  type: 'selectUser',
  payload: User
}
| {
  type: 'loadPosts',
  payload: Post[]
}
| {
  type: 'selectPost',
  payload: Post | null
}
| {
  type: 'loadComments',
  payload: Comment[] | null
}
| {
  type: 'addComment',
  payload: Comment
}
| {
  type: 'deleteComment',
  payload: number
};
