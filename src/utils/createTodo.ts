import { CommentData } from '../types/Comment';

export const createComment = (
  name: string,
  email: string,
  body: string,
): CommentData => ({
  name,
  email,
  body,
});
