import { basicRequest } from './api';

export const getUsers = () => {
  return basicRequest('/users?limit=10', {})
    .then(data => data
      .filter((user: User) => user.name.trim() && !(+user.name)));
};
