import { CommentData } from './Comment';

export type HandleCreateComment = (
  comment: Omit<CommentData, 'postId'>,
) => void;
export type HandleDeleteComment = (commentId: number) => void;
export type HandleLoadComments = (postId: number) => void;
export type HandleSelectUser = (userId: number) => void;
export type HandleSelectPost = (postId: number) => void;
export type HandleClosePostDetails = () => void;
