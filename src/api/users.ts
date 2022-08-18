import { ENDPOINTS, request } from './api';
import { User } from '../types/User';

export const getUser = (userId: number) => (
  request<User>(`${ENDPOINTS.users}/${userId}`)
);
