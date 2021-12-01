import { User } from '../types/User';
import { request } from './api';

export const getAllUsers = () => request<User[]>('/users');
