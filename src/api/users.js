import { request } from './api';

export const getUsers = async() => {
  const users = await request('/users');

  const preparedUsers = users.filter(user => user.name !== null);
  const noRepeatNames = [];
  const noRepeatUsers = [
    {
      id: -1,
      name: 'All users',
    }];

  for (let i = 0; i < preparedUsers.length;) {
    if (!noRepeatNames.includes(preparedUsers[i].name)) {
      noRepeatNames.push(preparedUsers[i].name);
      noRepeatUsers.push(preparedUsers[i]);
    }

    i += 1;
  }

  return noRepeatUsers;
};
