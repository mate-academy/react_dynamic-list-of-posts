import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = () => client.get<User[]>('/users');
