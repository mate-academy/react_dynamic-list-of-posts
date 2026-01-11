import { Comment } from '../types/Comment';
import { Notification } from '../types/Notification';
import { Post } from '../types/Post';

export interface AppState {
  selectedUserId: number | null;
  posts: Post[];
  selectedPostId: number | null;
  postsNotification: Notification | null;
  comments: Comment[];
  commentsNotification: Notification | null;
}

export type Action =
  | { type: 'SELECT_USER'; userId: number }
  | { type: 'SET_POSTS_SUCCESS'; posts: Post[] }
  | { type: 'SET_POSTS_ERROR' }
  | { type: 'SET_COMMENTS_SUCCESS'; comments: Comment[] }
  | { type: 'SET_COMMENTS_ERROR' }
  | { type: 'ADD_COMMENT'; comment: Comment }
  | { type: 'DELETE_COMMENT'; commentId: number }
  | { type: 'SET_SELECTED_POST'; postId: number | null };
