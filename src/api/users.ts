import { requestOnAPI } from './api';

export const getUsers = () => {
  return requestOnAPI('/users');
};
