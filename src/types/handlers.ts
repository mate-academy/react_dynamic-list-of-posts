import { FormErrors, SelectedPostId } from './types';

export type HandleUserSelect = (userId: number) => void;
export type HandleUserSelectorItemClick = (userId: number) => void;
export type HandlePostSelect = (postId: SelectedPostId) => void;
export type HandleCommentAdd = (
  name: string,
  email: string,
  text: string,
) => Promise<FormErrors>;
export type HandleCommentDelete = (commentId: number) => Promise<boolean>;
export type HandleCommentDeleteClick = (commentId: number) => void;
