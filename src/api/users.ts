import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsersFromServer = () => client.get<User[]>('/users');
