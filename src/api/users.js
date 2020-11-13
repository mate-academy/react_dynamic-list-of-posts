import { request } from './api';

export const getUsersList = async() => {
  const users = await request('/users');

  if (!users.length) {
    return [];
  }

  const preparedUsers = users.filter(user => user.name !== null);
  const noRepeatNames = [];
  const noRepeatUsers = [];

  for (let i = 0; i < preparedUsers.length;) {
    if (!noRepeatNames.includes(preparedUsers[i].name)) {
      noRepeatNames.push(preparedUsers[i].name);
      noRepeatUsers.push(preparedUsers[i]);
    }

    i += 1;
  }

  return noRepeatUsers;
};
