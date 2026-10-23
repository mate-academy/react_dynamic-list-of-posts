import { ApiError } from '../types/ApiError';

export function isApiError(data: unknown): data is ApiError {
  return typeof data === 'object' && data !== null && 'error' in data;
}
