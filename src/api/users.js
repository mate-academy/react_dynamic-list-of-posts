import { getData } from './api';

const url = 'users';

export const getAllUsers = () => getData(url);
