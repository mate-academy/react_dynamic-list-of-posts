import { request } from './api';

export const getUsers = async() => (
  (await request('/users'))
    .sort((previous, next) => previous.id - next.id)
    .slice(0, 5)
);
