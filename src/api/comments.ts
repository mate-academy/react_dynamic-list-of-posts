import { ENDPOINTS, request } from './api';
import { ResponseError } from '../types/ResponseError';
import { Comment } from '../types/Comment';

export const getPostComments = (postId: number) => (
  request<Comment | ResponseError>(`${ENDPOINTS.comments}?postId=${postId}`)
);
