import { User } from '../types/User';
import { getData } from './api';

export const getUsers = () => getData<User[]>('/users');
