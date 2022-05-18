import { getData } from './api';

export const getAllUsers = async (): Promise<User[]> => {
  return getData('/users');
};

export const getUserByName = async (username: string): Promise<User> => {
  return getData(`/users?username=${username}`);
};

export const getUserById = async (userId: number): Promise<User> => {
  return getData(`/users/${userId}`);
};
