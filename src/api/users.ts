import { requestOnAPI } from './api';

export const getUsers = async () => {
  return requestOnAPI('/users');
};
