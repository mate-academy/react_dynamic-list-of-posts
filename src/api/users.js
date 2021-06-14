import { getData } from './handleData';

export function getAllUsers(id = '') {
  return getData(`/users/${id}`);
}
