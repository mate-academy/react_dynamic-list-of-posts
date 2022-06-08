import { getData } from './posts';

export const getAllUsers = () => {
  return getData('/users');
};
