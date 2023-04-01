import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => client.get<User[]>('/users');
export const getPosts = (userID: number) => client.get<Post[]>(`/[posts?userId=${userID}`);
