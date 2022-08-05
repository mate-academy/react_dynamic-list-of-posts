import { PostData } from './PostData';
import { ResponseError } from './ResponseError';

export interface Post {
  data: PostData | null;
  responseError: ResponseError;
}
