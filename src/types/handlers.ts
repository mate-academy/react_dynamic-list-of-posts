import { SelectedPostId } from './types';

export type HandleUserSelect = (userId: number) => void;
export type HandleUserSelectorItemClick = (userId: number) => void;
export type HandlePostSelect = (postId: SelectedPostId) => void;
export type HandleCommentAdd = (
  name: string,
  email: string,
  text: string,
) => void;
export type HandleCommentDelete = (commentId: number) => void;
export type HandleCommentDeleteClick = (commentId: number) => void;
