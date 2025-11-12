import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => client.get<User[]>('/users');
