import { request } from './api';
import { User } from '../Types/User';

export const getAllUsers = () => request<User[]>('/users');
