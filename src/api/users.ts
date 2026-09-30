import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => client.get<User[]>('/users');
