import { ENDPOINTS, request } from './api';
import { User } from '../types/User';

export const getUserById = (userId: number) => (
  request<User>(`${ENDPOINTS.users}/${userId}`)
);
