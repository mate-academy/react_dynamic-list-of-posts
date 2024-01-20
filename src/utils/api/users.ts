import { client } from '../fetchClient';
import { User } from '../../types/User';

export const getUsers = () => client.get<User[]>('/users');
