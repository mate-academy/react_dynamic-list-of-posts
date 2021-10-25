import { request } from './api';

export const userRequest = () => {
  return request('/users?limit=10', {})
    .then(userData => userData.filter((user: UserTypes) => user.name.trim() && !(+user.name)));
};
