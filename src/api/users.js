import { request } from './api';

const users = [
  'Leanne Graham',
  'Ervin Howell',
  'Clementine Bauch',
  'Patricia Lebsack',
  'Chelsey Dietrich',
  'Mrs. Dennis Schulist',
  'Kurtis Weissnat',
  'Nicholas Runolfsdottir V',
  'Glenna Reichert',
  'Leanne Graham',
];

const adress = '/users';

export const getUsers = () => request(adress)
  .then(result => result
    .filter(user => users.includes(user.name)));
