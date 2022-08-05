import { Comment } from './Comment';
import { ResponseError } from './ResponseError';

export interface CommentsArray {
  data: Comment[] | null;
  responseError: ResponseError;
}
