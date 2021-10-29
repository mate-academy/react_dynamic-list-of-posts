import { getData } from './posts';

export const getUsers = () => getData('/users');

export const getUserPosts = (userId: number) => getData(`/posts?userId=${userId}`);
