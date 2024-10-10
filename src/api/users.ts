import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { ApiPath } from '../enums/api-path.enum';

export const getUsers = () => client.get<User[]>(ApiPath.USERS);
