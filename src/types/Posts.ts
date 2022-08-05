import { PostData } from './PostData';
import { ResponseError } from './ResponseError';

export interface Posts {
  data: PostData[] | null;
  responseError: ResponseError;
}
